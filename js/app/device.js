define(["app/models/device"], function (models) {
   
   var checkDeviceDetails = function(reg_id) {
       
            var device_id = window.localStorage.getItem('mountmercy_device_id');
            var api_key = window.localStorage.getItem('mountmercy_api_key');


            if(typeof(device_id)==='undefined' || device_id===null){
                //we dont have a device id so register it and save to local storage. 
                //should only ever enter here once     
                console.log('in the if so going to saveRegId and app.reg_id is ');
                console.log(app.reg_id);
                this.saveRegId(device_id, api_key, app.reg_id);        

            }
            else{
                //so we have already registered device on server. Now update reg_id
                console.log('in the else so going to updateRegId and app.reg_id is ');
                console.log(app.reg_id);
                this.updateRegId(device_id, api_key, reg_id);

            }
    
  },
  
  saveRegId = function(device_id, api_key, reg_id){
  
        var deviceModel = new models.Device();
        
        var deviceDetails = [];

        deviceDetails.project_title = 'mountmercy';
        
        console.log('in saveRegId ');
        
        deviceDetails.platform = window.device.platform;

        deviceModel.save(deviceDetails, 
            {                                    
            api: true,
            headers :{device_id:"63843",
            api_key:"hv7Vgd4jsbb"},
            success: function (data) {
                alert('successfully saved');
                var device_id = data.id;
                var api_key = data.get('api_key');
                window.localStorage.setItem('mountmercy_device_id', device_id);
                window.localStorage.setItem('mountmercy_api_key', api_key);

                //now update the Reg Id
                this.updateRegId(device_id, api_key, reg_id);
            },
            error:   function(model, xhr, options){
                alert('there was an error 2');
                console.log('***********error is *******************');
                console.log(xhr);
            },
        });
  },
  
  updateRegId = function(device_id, api_key, reg_id){
          
        require(["app/models/device"], function (model) {

                var deviceModel = new model.Device({id:device_id});
                var deviceDetails = [];

                deviceDetails.reg_id = reg_id;

                deviceModel.save(deviceDetails, 
                    {                                    
                    api: true,
                    headers :{device_id:device_id,
                    api_key:api_key},
                    success: function (data) {
                        alert('successfully updateRegId');
                    },
                    error:   function(model, xhr, options){
                        alert('failed to updateRegId');
                        // alert('in Error');
                        //console.log('failed to update, details: ');
                        //console.log(xhr.responseText);
                    },
                });

            });       
      
  };
  
  return {
    getSaveId: getSaveId
  };  
    
    
});
