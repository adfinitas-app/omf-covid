transferQueryParams($('a'), 'href');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function addOrModifyQueryParameter(elem, parameter, newValue, attr) {
    if (attr === undefined)
        attr = 'href';

    if (!elem || elem.length === 0)
    return false;
    
    let elemHref = elem.attr(attr);

    if (!elemHref || elemHref === '#' || elemHref.charAt(0) === '#')
        return '';
    else if (elemHref.charAt(0) === '/') 
        elemHref = window.location.origin + elemHref;

        console.log(elemHref);
    // const elemUrl = new URL(elemHref);
    const elemValue = getParameterByName(parameter, elemHref);
    
    let addedInterrogation = false;
    let newElemHref = elem.attr(attr);
    let hashtag = '';

    if (newElemHref.indexOf('#') >= 0) { // Temporarily remove # at the end of url
        hashtag = newElemHref.substring(newElemHref.indexOf('#'));
        newElemHref = newElemHref.slice(0, newElemHref.indexOf('#'));
    } 

    if (newElemHref.indexOf('?') < 0) {  // Insert ? if not present
        newElemHref += '?';
        addedInterrogation = true;
    }
    if (elemValue) {
        // Modify
        newElemHref = newElemHref.replace(parameter + '=' + elemValue, parameter + '=' + newValue);
    } else {
        // Add
        if (addedInterrogation)
            newElemHref += parameter + '=' + newValue;
        else
            newElemHref += '&' + parameter + '=' + newValue;
    }
    elem.attr(attr, newElemHref + hashtag);
}

function transferQueryParams($links, attr) {

    if (attr === undefined)
        attr = 'href';

    const url_string = window.location.href;
    const url = new URL(url_string);
    
    url.searchParams.forEach(function(value, key) {
        $links.each(function() {
            const authorized_keys = ['reserved_code_origine', 'reserved_code_media', 'utm_source', 'utm_campaign', 'utm_medium'];
            
            if (authorized_keys.includes(key)) {
                addOrModifyQueryParameter($(this), key, value, attr);
            }
        });
    });
}