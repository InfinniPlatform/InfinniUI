function adaptRowsHeightModel(availableH, rowHeightList){
    var summ = 0,
        maxI = 0,
        diff, newH;

    for(var i = 0, ii = rowHeightList.length; i < ii; i++){
        summ += rowHeightList[i];
        if(rowHeightList[i] > rowHeightList[maxI]){
            maxI = i;
        }
    }

    if(summ <= availableH){
        return rowHeightList;
    }

    if(summ > availableH){
        if(rowHeightList[maxI] < availableH/2.0){
            return rowHeightList;
        }

        diff = summ - availableH;
        newH = rowHeightList[maxI] - diff;
        if(newH < 100){
            newH = 100;
        }
        rowHeightList[maxI] = newH;
        return rowHeightList;
    }
}

function adaptHeightInsideElement($el){
    console.info('call adaptHeightInsideElement');
    return;
    var $panels = $el.find('.pl-stack-panel:not(.horizontal-orientation), .pl-scroll-panel, .modal-scrollable').filter(':visible'),
        $modals = $el.find('.modal-scrollable');

    if($modals.length){
        setTimeout(function(){
            adaptAction($panels);
        }, 850);
    }else{
        adaptAction($panels);
    }
}

function adaptAction($panels){
    for(var i = 0, ii = $panels.length; i < ii; i++){
        if($panels.eq(i).hasClass('pl-stack-panel')){
            adaptStackPanelHeight($panels.eq(i));
        }

        if($panels.eq(i).hasClass('pl-scroll-panel')){
            adaptScrollPanelHeight($panels.eq(i));
        }

        if($panels.eq(i).hasClass('modal-scrollable')){
            adaptModalHeight($panels.eq(i));
        }
    }
}

function adaptStackPanelHeight($el){
    var $parent = $el.parent(),
        parentHeight = $parent.height() - siblingsHeight($el),
        $children = $el.children(),
        childrenHeight = $children.map(function(i, el){
            var $el = $(el),
                $child = $el.children().eq(0);
            $child.data('last-scroll', $child.scrollTop());
            $el.css('height', 'auto');
            return $el.height();
        }).get(),
        newchildrenHeight = adaptRowsHeightModel(parentHeight, childrenHeight);

    $children.each(function(i, el){
        var $el = $(el),
            $child = $el.children().eq(0);
        if($el.height() != newchildrenHeight[i]){
            $el.height(newchildrenHeight[i]);
            $child.scrollTop($child.data('last-scroll'));
        }
    });
}

function adaptScrollPanelHeight($el){

}

function adaptModalHeight($el){
    var wh = $(window).height(),
        $header = $el.find('.modal-header'),
        $body = $el.find('.modal-body'),
        headerH = $header.outerHeight(),
        avalableH = wh - headerH - 30;

    $body.css('max-height', avalableH + 'px');
}

function siblingsHeight($el){
    var result = 0,
        $siblings = $el.siblings(':visible');
    for( var i = 0, ii = $siblings.length; i < ii; i++ ){
        result += $siblings.eq(i).outerHeight(true);
    }
    return result;
}