//input field area
const spinnerField=document.getElementById('spinner-field');
const searchFieldArea=()=>
{
    spinnerField.style.display='block';
  const inputfield=document.getElementById('input-field');
  const inputText=inputfield.value;
  inputfield.value='';
  const url=`https://openlibrary.org/search.json?q=${inputText}`;
  fetch(url)
 .then(res=>res.json())
 .then(data=>displayFunction(data));
}

const displayFunction=(data)=>
{
    
    spinnerField.style.display='none';
    const warningMeassge=document.getElementById('warning');
    const parentClassCard=document.getElementById('parent-class-card');
    const totalSearch=document.getElementById('number-of-search');
    warningMeassge.innerText='';
    totalSearch.innerText='';
    parentClassCard.textContent=''
    if(data.numFound!==0){
    const number=data.docs;
    number.forEach(datas=>
        {
            let url='';
            let publishYear='';
            let publisher='';
            let authorName
            totalSearch.innerText=`showing ${data.docs.length} out of total ${data.numFound} `;
            const div=document.createElement('div');
            //conditiion for unavailable image
            if(datas.cover_i===undefined)
            {
              
              url="image-not-available.png";
            }
            else{
              url=`https://covers.openlibrary.org/b/id/${datas.cover_i}-M.jpg`;
            }
            //condition if  first publish date is undefined
            if(datas.first_publish_year===undefined){
                publishYear='unknown'
            }
            else{
                 publishYear=datas.first_publish_year;
            }

            // condition if publisher is undefined
            if(datas.publisher===undefined)
            {
                publisher='unknown';
            }
            else
            {
                publisher= datas.publisher;
            }

            //condtiion if author name is undefined
            if(datas.author_name===undefined)
            {

                authorName='unknown';
            }
            else
            {
                authorName=datas.author_name;
            }
            div.classList.add('col')
            div.innerHTML=`
            <div class="card h-100">
            <img src="${url}" class="card-img-top card-image" alt="...">
            <div class="card-body mt-1">
              <h6 class="card-title mt-1"><span>book-Name: </span>${datas.title}</h6>
              <h5 class="card-title mt-1"><span>First Publish Year:</span> ${publishYear}</h5>
              <h5 class="card-title mt-1"><span>First-Publisher: </span>${publisher}</h5>
              <h5 class="card-title mt-1"><span>Author Name:</span>${authorName}</h5>
            </div>
            </div>
            `
            
            parentClassCard.appendChild(div);
            
        })
    }
    else
    {
        warningDisplay();
    }

}
//if input file doest get any object or arry
const warningDisplay=()=>{
const warningMeassge=document.getElementById('warning');
warningMeassge.innerText='book is not available please enter another book name';

}

   