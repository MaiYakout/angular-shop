function showNotification (message , type ) {
        Snackbar.show({
            text: message,
            actionTextColor: '#fff',
            backgroundColor: type,
            pos: 'bottom-right'
        });
    
}

const SUCCESS = "#8dbf42" ;
const WARNING = "#e2a03f" ;
const DANGER = "#e7515a" ;
const PRIMARY = "#1b55e2" ;
const INFO = "#2196f3" ;

module.exports = {
    showNotification : showNotification ,
    SUCCESS :SUCCESS,
    WARNING : WARNING ,
    DANGER :DANGER ,
    PRIMARY :PRIMARY,
    INFO :INFO
}