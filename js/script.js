window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Fade-slider


    let slideIndex = 1,
        slides = document.querySelectorAll('.images_image'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider_dots'),
        dots = document.querySelectorAll('.dot');
    
    showSlides(slideIndex)
    function showSlides(a){

        if(a>slides.length){
            slideIndex = 1;
        }
        if(a<1){
            slideIndex = slides.length;
        }
        slides.forEach((item)=> item.style.display = 'none');
        dots.forEach((i)=>i.classList.remove('dot_active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot_active');
    }

    function changeSlides(a){
        showSlides(slideIndex+=a);
    }
    function currentSlide(a){
        showSlides(slideIndex=a)
    }

    prev.addEventListener('click',()=>{
        changeSlides(-1)
    });

    next.addEventListener('click',()=>{
        changeSlides(1)
    });

    dotsWrap.addEventListener('click', (event)=>{
        for (let i=0; i<dots.length+1;i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });

    //Carousel_slider

    // let slideIndex = 1,
    //     slides = document.querySelectorAll('.images_image'),
    //     prev = document.querySelector('.prev'),
    //     next = document.querySelector('.next'),
    //     dotsWrap = document.querySelector('.slider_dots'),
    //     dots = document.querySelectorAll('.dot'),
    //     wrapper = document.querySelector('.images_wrapper');
    //     console.log(wrapper);

    //     next.addEventListener('click', ()=>{
    //         wrapper.style.left = '30%';
    //     });


    //Catalogue_tabs

    let tabsWrap = document.querySelector('.catalogue_tabs'),
        tabs = document.querySelectorAll('.catalogue_tabs_tab'),
        stpdbtns = document.querySelectorAll('.cat_btn'),
        items = document.querySelectorAll('.catalogue_items');

    activeTab(0);
    function activeTab(a){
        tabs.forEach((i)=>i.classList.remove('tab_active'));
        items.forEach((i)=>i.style.display = 'none');
        items[a].style.display = 'flex';
        tabs[a].classList.add('tab_active');
    }
        tabsWrap.addEventListener('click', (event)=>{
            let target = event.target;
            if(target && target.classList.contains('cat_btn')){
                for (let i = 0; i< tabs.length; i++){
                    if (target == stpdbtns[i]){
                        activeTab(i);
                    }
                }
            }
        });

        // console.log(dotsWrap);
    
    
    //Catalogue_item
    
    let backBtn = document.querySelectorAll('.back_btn'),
        moreBtn = document.querySelectorAll('.more_btn'),
        list = document.querySelectorAll('.catalogue_items_item_list'),
        main = document.querySelectorAll('.catalogue_items_item_main');

    itemSwitch()
    function itemSwitch(){
        main.forEach((i) => i.classList.add('main_active'));
        list.forEach((i) => i.classList.remove('list_active'));
    };
    
    // for (let i in moreBtn){
    //     moreBtn[i].addEventListener('click', ()=>{
    //         main[i].classList.remove('main_active');
    //         list[i].classList.add('list_active');
    //     });
    //     backBtn[i].addEventListener('click', ()=>{
    //         list[i].classList.remove('list_active');
    //         main[i].classList.add('main_active');
    //     });
    // }

    moreBtn.forEach((i, index)=> i.addEventListener('click', ()=>{
        for (let i in main){
            if (i == index){
                main[i].classList.remove('main_active');
                list[i].classList.add('list_active'); 
            }
        }
    }));
    backBtn.forEach((i, index)=> i.addEventListener('click', ()=>{
        for (let i in main){
            if (i == index){
                main[i].classList.add('main_active');
                list[i].classList.remove('list_active'); 
            }
        }
    }));


    // Modal_callback

    let consult = document.querySelectorAll('.consult_btn'),
        thanks = document.querySelector('#thanks'),
        callback = document.querySelector('#callback'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelectorAll('.modal_close'),
        modal = document.querySelectorAll('.modal'),
        order = document.querySelector('#order'),
        ordProd = document.querySelector('.order_descr'),
        error = document.querySelector('#oops'),
        cbForm = document.querySelector('#callback_form'),
        ordForm = document.querySelector('#order_form'),
        cnslForm = document.querySelector('#consult_form'),
        input = document.getElementsByTagName('input');
        console.log(cbForm);

    consult.forEach((i) => i.addEventListener('click', ()=>{
            overlay.style.display = 'flex';
            callback.style.display = 'block';
        }));
    
    cbForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(cbForm);

        let obj = {};
        formData.forEach((val, key)=>{
            obj[key] = val;
        });
        
        let json = JSON.stringify(obj);

        request.send(json);
        request.addEventListener('readystatechange', ()=>{
            if (request.readyState === 4 && request.status == 200 || request.readyState < 4){
                callback.style.display = 'none';
                thanks.style.display = 'block';
            }else{
                callback.style.display = 'none';
                error.style.display = 'block';
            }
        });

        for (let i in input){
            input[i].value = '';
        }
        // overlay.style.display = 'flex';
        // order.style.display = 'none';
        // callback.style.display = 'none';
        // thanks.style.display = 'block';
    });
    

    close.forEach((i)=> i.addEventListener('click', ()=>{
        modal.forEach((i)=>i.style.display = 'none');
        overlay.style.display = 'none';
    }));

    // Modal_buy


    let buyBtn = document.querySelectorAll('.order_btn'),
        product = document.querySelectorAll('.catalogue_items_item_header');


    buyBtn.forEach((i, index)=> i.addEventListener('click', ()=>{
        for (let i in buyBtn){
            if (i == index){
                overlay.style.display = 'flex';
                order.style.display = 'block';
                ordProd.innerHTML = product[i].innerText;
            }
        }
    }));

    ordForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(ordForm);

        let obj = {};
        formData.forEach((val, key)=>{
            obj[key] = val;
        });
        
        let json = JSON.stringify(obj);

        request.send(json);
        request.addEventListener('readystatechange', ()=>{
            if (request.readyState === 4 && request.status == 200 || request.readyState < 4){
                order.style.display = 'none';
                thanks.style.display = 'block';
            }else{
                order.style.display = 'none';
                error.style.display = 'block';
            }
        });

        for (let i in input){
            input[i].value = '';
        }
        // overlay.style.display = 'flex';
        // order.style.display = 'none';
        // callback.style.display = 'none';
        // thanks.style.display = 'block';
    });

    // consultation_form

    cnslForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(cnslForm);

        let obj = {};
        formData.forEach((val, key)=>{
            obj[key] = val;
        });
        
        let json = JSON.stringify(obj);

        request.send(json);
        request.addEventListener('readystatechange', ()=>{
            if (request.readyState === 4 && request.status == 200 || request.readyState < 4){
                overlay.style.display = 'flex';
                thanks.style.display = 'block';
            }else{
                overlay.style.display = 'flex';
                error.style.display = 'block';
            }
        });

        for (let i in input){
            input[i].value = '';
        }
        // overlay.style.display = 'flex';
        // order.style.display = 'none';
        // callback.style.display = 'none';
        // thanks.style.display = 'block';
    });

});
