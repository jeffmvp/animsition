(function($) {
  var namespace = 'clickstream';
  var methods = {
    init: function(options){
      options = $.extend({
        inClass :   'clickstream-in',
        outClass :  'clickstream-out',
        linkClass : 'clickstream-link'
      }, options);
      return this.each(function(){
        var //_this = this,
            $this = $(this),
            data = $this.data(namespace);
        if (!data) {        
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });          

          var inAnimate = $this.data('animate-in'),
              outAnimate = $this.data('animate-out'),
              inDelay =  $('.'+options.inClass).css('animation-duration').replace(/s/g,'') * 1000;

          setTimeout(function(){
            $this
              .removeClass(inAnimate +' '+ options.inClass)
              .addClass(options.outClass);
          },inDelay);

          $('.'+options.linkClass).on('click.' + namespace, function(e) {
            e.preventDefault();
            var url = $(this).attr('href'),
                outDelay =  $('.'+options.outClass).css('animation-duration').replace(/s/g,'') * 1000;
                      
            var stream = function(){
              location.href = url;
            };
            
            $this
              .addClass(outAnimate);

            setTimeout(function(){
             stream.call();
            },outDelay);            

          });

        }
      }); // end each
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.clickstream = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }
  };
})(jQuery);