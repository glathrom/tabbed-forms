'use strict';

/*
function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter();
*/

class FormGroup {
    constructor(n,e,toggle=false,toggle_key_id=null){
        this._group_name = n;
        this._names = e;
        this._row_names = this.names.map(x=>"_"+x+"_row");
        this._elements = this.row_names.map(e=>document.querySelector("#"+e));
        this._is_hidden = false;
    }

    hide(){
        for( var e of this.elements ){
            if( e ){
                e.classList.add("hide");
            }
            this.is_hidden = true;
        }
    }

    show(){
        for( var e of this.elements ){
            if( e ){
                e.classList.remove("hide");
            }
        }
        this.is_hidden = false;
    }
}

class MyForm {
    constructor(e){
        this.current_index = 0;
        this.groups = e;
        this.previous_link = document.querySelector("#formnav_previous");
        this.next_link = document.querySelector("#formnav_next");
        this.submit = document.querySelector("#_submit_form");
    }

    update(){
        for( var i = 0; i < this.groups.length; i++ ){
            if( i === this.current_index ){
                this.groups[i].show();
                if( i === 0 && this.groups.length > 1 ){
                    this.previous_link.classList.add("hide");
                    this.next_link.classList.remove("hide");
                    this.submit.classList.add("hide");
                } else if ( i === this.groups.length-1 ) {
                    this.previous_link.classList.remove("hide");
                    this.next_link.classList.add("hide");
                    this.submit.classList.remove("hide");
                } else {
                    this.previous_link.classList.remove("hide");
                    this.next_link.classList.remove("hide");
                    this.submit.classList.add("hide");
                }
            } else {
                this.groups[i].hide();
            }
        }
        this.update_nav_header();
    }
    
    update_nav_header(){
        var header = document.querySelector("#formnav");
        var i, a;
        for( i = 0; i < this.groups.length; i++ ){
            a = document.querySelector("#group"+i);
            if( i === this.current_index ){
                a.classList.add("active");
            } else {
                a.classList.remove("active");
            }
        }
    }

    create_nav_header(){
        var i,li,a;
        var ul = document.createElement("ul");
        ul.setAttribute("id","formnav");
        ul.classList.add("nav");
        ul.classList.add("nav-tabs");
        ul.setAttribute("role","tablist");
        for( i = 0; i < this.groups.length; i++ ){
            li = document.createElement("li");
            li.classList.add("nav-item");
            a = document.createElement("a");
            a.setAttribute("id", "group"+i);
            a.setAttribute("href", "#");
            a.classList.add("nav-link");
            if( i === 0 ){
                a.classList.add("active");
            }
            a.setAttribute("data-toggle", "tab");
            a.setAttribute("role","tab");
            a.setAttribute("aria-controls", "");
            a.setAttribute("aria-expanded", "true");
            a.innerHTML = this.groups[i].group_name;
            li.appendChild(a);
            ul.appendChild(li);
        }
        document.querySelector("#_main_content").children[0].insertAdjacentElement('afterbegin',ul);

        for( i = 0; i < this.groups.length; i++ ){
            a = document.querySelector("#group"+i);

            a.addEventListener('click',(ev)=>{
                var groupid = "group0";
                for( var j = 0; j < this.groups.length; j++ ){
                    groupid = "group"+j;
                    if( groupid === ev.target.id ){
                        console.log("target = " + j);
                        this.current_index = j;
                        ev.target.classList.add("active");
                        this.update();
                    } else {
                        document.querySelector("#group"+j).classList.remove("active");
                    }
                }
            });
        }
    }
}
