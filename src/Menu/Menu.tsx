import React, {useEffect, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';

const Menu: React.FC = () => {
    return (
        <nav id="nav" className={styles.nav}>
            <div className={styles.navbarHeader}>
                <div className={styles.brand}>
                    <img alt={"Logo"} className={styles.navbarLogo} src={Logo}/>
                    <span className={styles.navbarTitle}>GeoVIS</span>
                </div>
            </div>

            <ul role="menu" className={styles.menuList}>
                <li className="submenu">
                    <a href="javascript:void(0)">
                        <i className="material-icons">assignment</i>Dados
                    </a>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="carregarDados">*/}
                    {/*            <i className="material-icons">attach_file</i>Carregar*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </li>
                <li className="submenu">
                    <a href="javascript:void(0)">
                        <i className="material-icons">insert_chart</i>Visualizações
                    </a>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="adicionarVisualizacao">*/}
                    {/*            <i className="material-icons">add</i>Adicionar*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="removerVisualizacao">*/}
                    {/*            <i className="material-icons">delete</i>Remover*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </li>
                <li className="submenu">
                    <a href="javascript:void(0)">
                        <i className="material-icons">details</i>Filtros
                    </a>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="adicionarFiltro">*/}
                    {/*            <i className="material-icons">add</i>Adicionar*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="removerFiltro">*/}
                    {/*            <i className="material-icons">delete</i>Remover*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </li>
                <li>
                    <a href="javascript:void(0)" id="salvarApp">
                        <i className="material-icons">file_download</i>Salvar
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" id="carregarApp">
                        <i className="material-icons">file_upload</i>Carregar
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Menu
