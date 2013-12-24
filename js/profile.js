var setup = {
	loadSetting: function(){
		var $tpl = $("#settingTpl"),
			$target = $("#settingContent");
		var tp = $tpl.val(),
			newTp = '',
			obj = {};				
			obj = app.user;
			newTp += $.template(tp, obj);
		$target.html(newTp).css3Animate({ time: "500ms", opacity: 1 });
	},
	
	loadProfile: function(){			
		var $tpl = $("#profileTpl"),
			$target = $("#profileContent");
		var tp = $tpl.val(),
			newTp = '',
			obj = {};				
			obj = app.user;
			newTp += $.template(tp, obj);
		$target.html(newTp).css3Animate({ time: "500ms", opacity: 1 });
	},
	// ����ͷ����
    takePicture: function () {
        var deferred  = when.defer(),
            destinationType=navigator.camera.DestinationType,
            options = {
                quality: 20,
                destinationType: destinationType.FILE_URI
                //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //cameraDirection: Camera.Direction.FRONT,
                //targetWidth: 240,
                //targetHeight: 320,
                //correctOrientation: true
        };
        navigator.camera.getPicture(function(data){
            deferred.resolve(data);
        }, null, options);
        
        return deferred.promise
    },
	// �ϴ�ͼƬ��������
    uploadPicture: function( imageURI ){
        var deferred  = when.defer(),
            options = new FileUploadOptions();
        options.fileKey = "avatar",
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
        
        var ft = new FileTransfer();
        // �ϴ��ص�
        ft.onprogress = showUploadingProgress;
        navigator.notification.progressStart("", "��ǰ�ϴ�����");
        ft.upload( imageURI, encodeURI('http://ibos2.cc/?r=mobile/setting/upload'), function(){ 
            deferred.resolve( imageURI );
            navigator.notification.progressStop();
        } , null, options);
        return deferred.promise
    },
    
    // ��ʾ�ϴ�����
    showUploadingProgress: function( progressEvt ){
        if( progressEvt.lengthComputable ){
            navigator.notification.progressValue( Math.round( ( progressEvt.loaded / progressEvt.total ) * 100) );
        }
    },
    // �ӻ�����ɾ��ͼƬ
    deletePictureFromCache: function( imageURI ){
        window.resolveLocalFileSystemURI(fileURI, function( fileEntry ){
            fileEntry.remove();
        }, null);
    }
}