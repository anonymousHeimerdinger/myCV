
function genera() {
    $('body').scrollTop(0);
    createPDF();
}



function createPDF() {
    doc = new jsPDF({
        unit: 'px',
        format: 'a4'
    });

    recursive(1);
}


function recursive(numberPage){
    var classPage = '.page' + numberPage + '_form';
      
    if ($(classPage).length != 0) {
        if(numberPage != 1){
            doc.addPage();
        }
        getCanvas(numberPage).then(function(canvas) {
            ///Per codificar/descodificar les imatges a base64 --> http://www.base64-image.net/
            var img = canvas.toDataURL("image/png");
            doc.addImage(img, 'PNG32', 20, 20);

            recursive(numberPage + 1);
        });
    }else{
        close(numberPage);
    }  
        
}


function close(numberPage){
    doc.save("CV GENIS GILAVERT BERLANA.pdf");
    for(var i = 1; i <= numberPage ;++i){
        $('.page' + i + '_form').css('width', '100%');
    }
}



function getCanvas(numberPage) {
    var classPage = '.page' + numberPage + '_form';
    var form_pag = $(classPage),
        cache_width = form_pag.width(),
        a4 = [595.28, 841.89]; 

    form_pag.width((a4[0] * 1.33333) - 80).css('max-width', 'none');

    return html2canvas(form_pag, {
        imageTimeout: 2000,
        removeContainer: true
    });
}

