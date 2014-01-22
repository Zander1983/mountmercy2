define(["app/models/device"], function (models) {
   
   var getSaveId = function() {
    
        alert('in getSaveId');
    
        var deviceModel = new models.Device();
        
        alert('got the device model');
        
        var deviceDetails = [];

        deviceDetails.project_title = 'mountmercy';
        
        alert('getting platform...');
        deviceDetails.platform = window.device.platform;

        alert('before the save');
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
                //app.updateRegId(device_id, api_key, reg_id);
            },
            error:   function(model, xhr, options){
                alert('there was an error 2');
                console.log('***********error is *******************');
                console.log(xhr);
            },
        });

        alert('after the save');
    
  };
  return {
    getSaveId: getSaveId
  };  
    
    
});
