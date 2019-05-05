const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const uploadpath = __dirname+'/upload'

const _compressImg = async (filepath, params, callback)=> {
    await imagemin([filepath], __dirname+'/process', {
        use: [  
          imageminMozjpeg({
            quality: params.quality || 70
          })
        ]
    });
    callback(null, __dirname+'/process/'+params.name)
}

const ImgProcessApi = {

    processImg : async (file, params, callback)=> {
        let filePath = uploadpath+'/'+file.image.name
        await file.image.mv(filePath, function(err) {
            if (err) callback(err);
            else {
                return _compressImg(filePath, {...params, 'name':file.image.name}, callback)
            }
        })
    }
}

module.exports = ImgProcessApi