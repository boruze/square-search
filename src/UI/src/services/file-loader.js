export const readFileToString = (file) => {
    return new Promise(function(resolve, reject){
    let reader = new FileReader();
        reader.onloadend = (c) => {
            if (c.target.readyState == FileReader.DONE){
                resolve(c.target.result);
            }
        }
        reader.readAsText(file);
    });
}