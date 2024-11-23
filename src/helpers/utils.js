const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { reject } = require('underscore');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    secure: true,
    type: "private",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const destroyImage = (oldImageName, folder) => {
    return new Promise((resolve, reject) => {        
        oldImageName && cloudinary.uploader.destroy( 
            folder + '/' + oldImageName, 
            { 
                resource_type: 'image', 
                format: 'jpg', 
                type: 'private'
             }
        ).then( ( result, err ) =>{
            if ( result ) {
                console.log(result);
                resolve( result );
            }else {
                console.log(err);
                reject( err );
            }
        }); 
    });  
}

const StreamUpload = (image, imageName, oldImageName, folder) => {
    return new Promise((resolve, reject) => {        
        oldImageName && cloudinary.uploader.destroy( 
            folder + '/' + oldImageName, 
            { 
                resource_type: 'image', 
                format: 'jpg', 
                type: 'private'
             }).then( ( result, err ) =>console.log( result ));        
        const cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                folder,
                type: 'private',
                secure: true,
                public_id: imageName,
                format: image.originalname.split('.').pop(),
            }
            , ( err, result ) => {
                if ( result ) {
                    resolve( result );
                }
                else {
                    reject( err );
                }
            });            
        streamifier.createReadStream( image.buffer ).pipe( cld_upload_stream );
    });
}
module.exports = { StreamUpload, destroyImage}