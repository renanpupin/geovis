import React, {useEffect, useState} from 'react';
import Button from 'src/components/Button/Button'
import Step1Content from 'src/components/VisualizationWizard/Steps/Step1Content'
import StepChartType from 'src/components/VisualizationWizard/Steps/StepChartType'
import StepChartAttribute from 'src/components/VisualizationWizard/Steps/StepChartAttribute'

import styles from "./Wizard.module.scss"
import Modal from "src/components/Modal/Modal";
import StepTemplate from "src/components/VisualizationWizard/StepTemplate";
import {VisualizationTypeValues} from "src/redux/data/types";

type MarkerChartTypeProps = 'line' | 'bar' | 'pie'

type MarkerChartProps = {
    map: any
    data: any
    type: MarkerChartTypeProps
}

const MarkerChart = (props: MarkerChartProps) => {
    const {map, data, type} = props

    const getColorForNormalizedValue = (normalizedValue: number) => {
        console.log("getColorForNormalizedValue", normalizedValue);
        if(normalizedValue <= 20){
            return "0000FF";
        }else if(normalizedValue > 20 && normalizedValue <= 40){
            return "00FFFF";
        }else if(normalizedValue > 40 && normalizedValue <= 60){
            return "00FF00";
        }else if(normalizedValue > 60 && normalizedValue <= 80){
            return "FFFF00";
        }else{
            return "FF0000";
        }
    };

    const getScaleForNormalizedValue = (normalizedValue: any) => {
        console.log("getScaleForNormalizedValue", normalizedValue);

        return (normalizedValue/50)+0.5;  //make the scale go from 1 to 3
    };

    const processChartData = (features: any, attributesMinMaxValues: any, marker: any, type: any) => {

        let values = "";
        let legends = "";
        let colors = "";

        var markerFeature = features.findFeatureById(marker.id);
        var avg = 0;

        if (markerFeature.visible === true){
            for(var index = 0; index < attributesMinMaxValues.length; index++){

                var normalizedValue = 100 * ((markerFeature.getAttributeValueByName(attributesMinMaxValues[index].name) - attributesMinMaxValues[index].min) / (attributesMinMaxValues[index].max - attributesMinMaxValues[index].min));

                values += normalizedValue;
                legends += String(attributesMinMaxValues[index].name);
                colors += getColorForNormalizedValue(normalizedValue);
                avg += normalizedValue;

                if(index !== attributesMinMaxValues.length-1){
                    values += ",";
                    legends += "|";
                    colors += type === "bar" ? "|" : ",";
                }
            }
        }

        avg = avg / attributesMinMaxValues.length;

        return {values, avg, legends, colors};
    }

    const generateChartUrl = (features: any, attributesMinMaxValues: any, marker: any) => {
        //set value
        let result = processChartData(features, attributesMinMaxValues, marker, type);
        let url = `https://chart.googleapis.com/chart?chxl=0:||1:|&chf=bg,s,FFFFFF00`;
        //legends: &chl=${result.legends}

        //set type and size
        let size;
        let scale = getScaleForNormalizedValue(result.avg);
        let width;
        let height;
        let gChartType;
        let colors;
        if(type === "bar"){
            // gChartType = "bvs";
            gChartType = "bvg";
            colors = result.colors;
            size = "100x160";
            width = 65*scale;
            height = 35*scale;
        }else if(type === "line"){
            let normalizedColor = getColorForNormalizedValue(result.avg);

            url += `&chm=B,${normalizedColor},0,0,0`;   //&chm=a,990066,0,0.0,9.0|o,FF0000,0,1.0,25
            colors = normalizedColor;
            gChartType = "lc";  //lc:nda
            size = "100x100";
            width = 50*scale;
            height = 50*scale;
        }else{
            gChartType = "p3";
            colors = result.colors;
            size = "100x50";
            width = 65*scale;
            height = 37*scale;
        }

        url += `&chs=${size}`;
        url += `&cht=${gChartType}`;
        url += `&chco=${colors}`;
        url += `&chd=t:${result.values}`;

        return {url, width, height};

    };

    const generateMarkerCharts = () => {
        let markers = map.getMarkers();

        let attributesMinMaxValues = data.calculateAttributesMinAndMaxValue();

        for (let index = 0; index < markers.length; index++) {
            // console.log(markers[index]);

            let result = generateChartUrl(data, attributesMinMaxValues, markers[index]);

            return {
                url: result.url,
                size: new google.maps.Size(result.width, result.height),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point((result.width/2), (result.height/2)),
                scaledSize: new google.maps.Size(result.width, result.height)
            }
        }
    }

    return generateMarkerCharts()
}

export default MarkerChart
