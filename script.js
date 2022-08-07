const imagecontainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imagesloaded=0;
let totalimages=0;
let photosarray=[];
const count=10;
const APIkey = "r-ZzHz6OnqIJqU0kQcnIO4Xcps636gLnvXL6AqDsijk"
const query = "puppy"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&count=${count}&query=${query}&orientation=squarish;`

//check if images are loaded
function imageloaded(){
    imagesloaded++;
    if(imagesloaded===totalimages){
        ready=true;
        loader.hidden=true;
    }
}
//helper function to set attributes on dom elements

function setattributes(element , attributes){
    for(const key in attributes){
        element.setattributes(key , attributes[key]);
    }
}
//create elements for links and photos , add to dom

function displayphotos(){
    imagesloaded=0;
    totalimages=photosarray.length;
    //run function for each photo
    photosarray.forEach((photo)=>{
        //create a link to full photo
        const item=document.createElement('a');
        setattributes(item ,{
            href: photo.links.html,
            target:'_blank',


        });
        //create img for photo

        const img=document.createElement('img');
        setattributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
          });

          //event listner , check when each is finished loading
          img.addEventListener('load',imageloaded);
          item.appendChild(img);
          imagecontainer.appendChild(item);

    });
}

//get photos from API

async function getphotos(){
    try {
        const response=await fetch(apiUrl);
        photosarray=await response.json();
        displayphotos();
    } catch (error) {
        
    }
}
//check to see if scrolling near bottom of page load more photos

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getphotos();
    }
});
//on load
getphotos();