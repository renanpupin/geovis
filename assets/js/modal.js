(function ( $ ) {
  $.fn.Modal = function(options) {
    var self = this;
    function openModal(){
      $(self).addClass("open");
      $(self).trigger('focus');
    }
    function closeModal(){
      $(self).removeClass("open");
    }
    
    var defaults = {
        action: "open",
        title: "Modal Title",
        content: "Your content here",
        footer: '<div class="row">'+
                    '<div class="grid-m-6 grid-s-6 grid-xs-12">'+
                      '<button id="btnCloseModal" class="btn btn-secundary">CLOSE</button> '+
                    '</div>'+
                    '<div class="grid-m-6 grid-s-6 grid-xs-12">'+
                      '<button id="btnConfirmModal" class="btn btn-primary">OK</button>'+
                    '</div>'+
                '</div>',
        max_width: "inherit",
        min_width: "inherit",
        max_height: "inherit",
        min_height: "inherit",
        size: "auto",
        addClass: "",
        // onConfirm: function(){
        //   alert("OK click");
        // },
        // onClose: function(){
        //   alert("CLOSE click");
        // },
        closeButtonText: "CLOSE",
        confirmButtonText: "OK"
    };
    
    
    
    //PLUGIN SETTINGS
    var settings = $.extend( {}, defaults, options );
    
    //action
    if ( settings.action === "open") {
        openModal();
    }else if ( settings.action === "close" ) {
        closeModal();
    }
    
    //setting title
    $(self).find(".modal-header .modal-title").html(settings.title);
    
    //setting content
    $(self).find(".modal-body").html(settings.content);
    
    //setting footer
    if(settings.closeButtonText !== "CLOSE"){
      settings.footer = '<div class="row">'+
                          '<div class="grid-m-6 grid-s-6 grid-xs-12">'+
                            '<button id="btnCloseModal" class="btn btn-secundary">'+settings.closeButtonText+'</button> '+
                          '</div>'+
                          '<div class="grid-m-6 grid-s-6 grid-xs-12">'+
                            '<button id="btnConfirmModal" class="btn btn-primary">'+settings.confirmButtonText+'</button>'+
                          '</div>'+
                      '</div>';
    }
    $(self).find(".modal-footer").html(settings.footer);

    //close event
    $("#modalClose, #btnCloseModal").on( "click", function(e){
      if (settings.onClose !== undefined) {
        settings.onClose();
      }
      closeModal();
      e.stopPropagation();
    });
    $(document).on("keyup", self, function (e){
      e.preventDefault();
      if(e.keyCode == 27 && $(self).hasClass("open")){
        closeModal();
      }
    });
    
    //confirm event
    $("#btnConfirmModal").on( "click", function(e) {
      if (settings.onConfirm !== undefined) {
         settings.onConfirm();
      }
      e.stopPropagation();
    });
    
    //size
    if ( settings.size === "large") {
        $(self).addClass("modal-large");
    }else if ( settings.size === "small") {
        $(self).addClass("modal-small");
    }
    
    //set css
    $(self).find(".modal-dialog").css({
      max_width: settings.max_width,
      min_width: settings.min_width,
      max_height: settings.max_height,
      min_height: settings.min_height
    });
    
    //set class
    $(self).addClass(settings.addClass);
    
  };
}( jQuery ));