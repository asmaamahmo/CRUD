var siteName = document.getElementById('bookmarkName');
var siteUrl = document.getElementById('bookmarkUrl');
var tableBody = document.getElementById('tBody');
var errorMsg = document.getElementById('error');
// var urlInput = document.getElementById("bookmarkUrl").value;





var sitesURL;
if (localStorage.getItem('Urls') != null) {
    sitesURL = JSON.parse(localStorage.getItem('Urls') );
    display(sitesURL);
    
}else {
    sitesURL = [];
}

function addUrl() {
    var siteNameValue = siteName.value.trim();
    var siteUrlValue = siteUrl.value.trim();
    if (siteNameValue !== "" && siteUrlValue !== "" && validatName(siteNameValue) && validatURL(siteUrlValue)) {
        var ObjectUrl = {
            nameSite : siteName.value,
            urlSite : siteUrl.value
    
        };
        sitesURL.push(ObjectUrl);
        localStorage.setItem('Urls' , JSON.stringify(sitesURL));
        console.log(sitesURL);
        ClearForm();
        display(sitesURL);
    }else {
        errorEnter();
    }
 
}

function ClearForm() {
    siteName.value = '',
    siteUrl.value = ''
}



function display(arr) {
    var Index = 0;
    var cartoona = ``;
    for(var i = 0 ; i < sitesURL.length ; i++)
    {
        Index = i +1;
        cartoona += `
        <tr>
    <td>${Index}</td>
    <td>${arr[i].nameSite}</td>
    <td><button onclick="visitUrl(${i})" class="btn btn-success px-3">
       <i class="fa-regular fa-eye pe-1"></i>
       Visit</button></td>
    <td><button onclick = "deletUrl(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash-can pe-1"></i>
      Delete</button></td>

</tr>
`
    }
    tableBody.innerHTML = cartoona;

}

function deletUrl(urlIndex) {
    sitesURL.splice(urlIndex , 1);
    localStorage.setItem('Urls' , JSON.stringify(sitesURL));
    display(sitesURL);
    
}


function visitUrl(indexSite) {
    if (indexSite >= 0 && indexSite < sitesURL.length) {
        var urlToVisit = sitesURL[indexSite].urlSite;
        var nameToVisit = sitesURL[indexSite].nameSite;
        siteName.value = nameToVisit;
        siteUrl.value = urlToVisit;
        window.open(urlToVisit, "_blank");
    } else {
        return false;
    }
}


function validatName(nameSite) {
   var rgx = /^[A-Za-z]{1}[a-z]{2,9}\S*$/;
    if (rgx.test(nameSite)) {
        siteName.classList.replace('is-invalid' , 'is-valid');
        return true;
        
    }else {
        siteName.classList.add('is-invalid');
        return false;
    }
    
}

function validatURL(urlSite) {
    var regex = /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\~+#-]*[\w@?^=%\/~+#-])?$/;
    if(regex.test(urlSite)){
        siteUrl.classList.replace('is-invalid','is-valid');
        return true;
    }else {
        siteUrl.classList.add('is-invalid');
        return false;

    }
    
}
document.getElementById('closeBtn').addEventListener('click' , close)
function errorEnter() {
    errorMsg.classList.remove('d-none');
}
// var btnClos = document.getElementById('closeBtn');
function close() {
    
    errorMsg.classList.add('d-none');

    // console.log('error');
}

