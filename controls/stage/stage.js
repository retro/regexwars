define(['can/util/string', 'mustache!./init', 'can/control'], function(can, initMustache){

  return can.Control({
    defaults : {

    }
  },{
    init : function(){
      this.element.append(initMustache({
        engine : 'Mustache'
      }));
    }
  });

})