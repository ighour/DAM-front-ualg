webpackJsonp([1],{"+4bw":function(e,t){},0:function(e,t){},1:function(e,t){},"1/oy":function(e,t){},"6GAL":function(e,t){},"9M+g":function(e,t){},ETW8:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("7+uW"),o=r("mtWM"),n=r.n(o).a.create({baseURL:"https://dam-movie-backend.herokuapp.com/api/",headers:{Accept:"text/xml",Authorization:"Bearer "+localStorage.getItem("token")},responseType:"text"}),a=r("Dd8w"),i=r.n(a),l=r("NYxO"),c={computed:i()({},Object(l.c)({token:"getToken",user:"getUser"})),methods:i()({},Object(l.b)({clearAuth:"clearAuth"}),{logout:function(){this.clearAuth(),this.$router.push({name:"index"})}})},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-nav",{staticClass:"menu",attrs:{fill:"",tabs:""}},[r("b-nav-item",{attrs:{to:{name:"index"},exact:""}},[e._v("Home")]),e._v(" "),r("b-nav-item",{attrs:{to:{name:"movie"},disabled:!e.token}},[e._v("My Movies")]),e._v(" "),r("b-nav-item",{attrs:{to:{name:"genre"},disabled:!e.token}},[e._v("My Genres")]),e._v(" "),r("b-nav-item",{attrs:{to:{name:"user.spy"}}},[e._v("My Friends")]),e._v(" "),e.token?r("b-nav-item",{attrs:{disabled:""}},[e._v(e._s(e.user.name)+" "),r("span",{staticClass:"logout",on:{click:function(t){e.logout()}}},[e._v("(logout)")])]):r("b-nav-item",{attrs:{to:{name:"index"},exact:""}},[e._v("Login")])],1)},staticRenderFns:[]};var d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"footer"},[t("p",[this._v(" DAM/Ualg Project made by "),t("a",{attrs:{href:"https://github.com/ighour",target:"_blank"}},[this._v("Célio")])])])}]};var m={name:"App",components:{"app-menu":r("VU/8")(c,u,!1,function(e){r("PQqf")},"data-v-8946592e",null).exports,"app-footer":r("VU/8")(null,d,!1,function(e){r("TE9p")},"data-v-2c1f9f08",null).exports}},f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"container-fluid"},[t("app-menu")],1),this._v(" "),t("div",{staticClass:"container content"},[t("router-view")],1),this._v(" "),t("div",{staticClass:"container-fluid"},[t("app-footer")],1)])},staticRenderFns:[]};var p=r("VU/8")(m,f,!1,function(e){r("ETW8")},"data-v-050163ac",null).exports,b=r("/ocq"),v={name:"Index",data:function(){return{form:{email:null,password:null},formRegister:{name:null,email:null,password:null},show:!0,showRegister:!0,showError:!1,errorMessage:null,showErrorRegister:!1,errorMessageRegister:null}},computed:i()({},Object(l.c)({token:"getToken",user:"getUser"})),methods:i()({},Object(l.b)({setToken:"setToken",setUser:"setUser"}),{onSubmit:function(e){var t=this;e.preventDefault(),n.post("login",{email:this.form.email,password:this.form.password}).then(function(e){var r=e.data.data;t.setToken(r.token),t.setUser(r.user)}).catch(function(e){t.showError=10,t.errorMessage=e.response.data.data.error})},onSubmitRegister:function(e){var t=this;e.preventDefault(),n.post("register",{name:this.formRegister.name,email:this.formRegister.email,password:this.formRegister.password}).then(function(e){var r=e.data.data;t.setToken(r.token),t.setUser(i()({},r.user))}).catch(function(e){t.showErrorRegister=10,t.errorMessageRegister=e.response.data.data.error})},onResetRegister:function(e){var t=this;e.preventDefault(),this.formRegister={name:null,email:null,password:null},this.showRegister=!1,this.$nextTick(function(){t.show=!0})}})},h={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.token?r("p",[e._v("Hello, "+e._s(e.user.name)+"!")]):r("b-container",{staticClass:"register",attrs:{fluid:""}},[r("b-row",[r("b-col"),e._v(" "),r("b-col",{attrs:{cols:"6"}},[r("b-card",{attrs:{"border-variant":"primary",header:"Movies List","header-bg-variant":"primary","header-text-variant":"white",align:"center"}},[e.show?r("b-form",{on:{submit:e.onSubmit}},[r("b-form-group",{attrs:{id:"email",label:"Email","label-for":"email",align:"left"}},[r("b-form-input",{attrs:{id:"email",type:"email",required:"",placeholder:"Your email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"password",label:"Password","label-for":"password",align:"left"}},[r("b-form-input",{attrs:{id:"password",type:"password",required:"",placeholder:"Your password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Login")]),e._v(" "),r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.registerModal",modifiers:{registerModal:!0}}]},[e._v("Register")])],1):e._e()],1),e._v(" "),r("b-alert",{attrs:{variant:"danger",dismissible:"",show:e.showError},on:{dismissed:function(t){e.showError=!1}}},[e._v(e._s(e.errorMessage))])],1),e._v(" "),r("b-col")],1)],1),e._v(" "),e.token?e._e():r("b-modal",{ref:"myRegisterModal",attrs:{id:"registerModal",title:"Register"}},[e.showRegister?r("b-form",{on:{submit:e.onSubmitRegister,reset:e.onResetRegister}},[r("b-form-group",{attrs:{id:"registerName",label:"Name","label-for":"registerName"}},[r("b-form-input",{attrs:{id:"registerName",type:"text",required:"",placeholder:"Your name"},model:{value:e.formRegister.name,callback:function(t){e.$set(e.formRegister,"name",t)},expression:"formRegister.name"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"registerEmail",label:"Email","label-for":"registerEmail"}},[r("b-form-input",{attrs:{id:"registerEmail",type:"email",required:"",placeholder:"Your email"},model:{value:e.formRegister.email,callback:function(t){e.$set(e.formRegister,"email",t)},expression:"formRegister.email"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"registerPassword",label:"Password","label-for":"registerPassword"}},[r("b-form-input",{attrs:{id:"registerPassword",type:"password",required:"",placeholder:"Your password"},model:{value:e.formRegister.password,callback:function(t){e.$set(e.formRegister,"password",t)},expression:"formRegister.password"}})],1),e._v(" "),r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")]),e._v(" "),r("b-button",{attrs:{type:"reset",variant:"danger"}},[e._v("Reset")]),e._v(" "),r("b-alert",{attrs:{variant:"danger",dismissible:"",show:e.showErrorRegister},on:{dismissed:function(t){e.showErrorRegister=!1}}},[e._v(e._s(e.errorMessageRegister))])],1):e._e()],1)],1)},staticRenderFns:[]};var g=r("VU/8")(v,h,!1,function(e){r("+4bw")},"data-v-3c307d1c",null).exports,_=r("k5VZ"),y=r.n(_),k={name:"TableTemplate",created:function(){var e=this;this.token?n.get(this.conf.resource).then(function(t){e.responseIndex(t)}).catch(function(e){console.log(e.response)}):this.$router.push({name:"index"})},props:["conf","elements","newElements","fields","form","responseIndex","responseEdit","editingIndex","getObjectAtt","getIndexById","updateEditingForm","resetForm"],data:function(){return{show:!0,formType:null,sortBy:null,sortDesc:!1,filter:null}},computed:i()({},Object(l.c)({token:"getToken",user:"getUser"}),{formTitle:function(){return 2==this.formType?"Edit "+this.conf.formTitle:"Add "+this.conf.formTitle},sortOptions:function(){return this.fields.filter(function(e){return e.sortable}).map(function(e){return{text:e.label,value:e.key}})}}),methods:{create:function(){var e=this;n.post(this.conf.resource,this.form).then(function(t){s.a.set(e.newElements,e.newElements.length,t.data.data)}).catch(function(e){console.log(e.response)})},edit:function(){var e=this,t=this.form.id;n.put(this.conf.resource+"/"+t,this.form).then(function(t){e.responseEdit(t)}).catch(function(e){console.log(e.response)})},destroy:function(e,t){var r=this,o=this.getObjectAtt(e,"id");n.delete(this.conf.resource+"/"+o).then(function(e){var o=r.elements.length-1;t>o?s.a.delete(r.newElements,t-o-1):s.a.delete(r.elements,t)}).catch(function(e){console.log(e.response)})},onSubmit:function(e){e.preventDefault(),2==this.formType?this.edit():this.create(),this.$refs.myFormModalRef.hide()},onReset:function(e){var t=this;e.preventDefault(),this.resetForm(),this.show=!1,this.$nextTick(function(){t.show=!0})},formCreate:function(){this.formType=1,this.resetForm()},formEdit:function(e,t){this.formType=2,this.updateEditingForm(e,t)}}},x={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v(e._s(e.conf.title))]),e._v(" "),r("div",{staticClass:"text-right",staticStyle:{"margin-right":"1%"}},[r("b-btn",{directives:[{name:"b-modal",rawName:"v-b-modal.formModal",modifiers:{formModal:!0}}],attrs:{variant:"primary"},on:{click:function(t){e.formCreate()}}},[e._v(e._s(e.conf.addMsg))])],1),e._v(" "),r("b-container",{attrs:{fluid:""}},[r("b-row",[r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Filter"}},[r("b-input-group",[r("b-form-input",{attrs:{placeholder:"Type to Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),e._v(" "),r("b-input-group-append",[r("b-btn",{attrs:{disabled:!e.filter},on:{click:function(t){e.filter=""}}},[e._v("Clear")])],1)],1)],1)],1),e._v(" "),r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Sort"}},[r("b-input-group",[r("b-form-select",{attrs:{options:e.sortOptions},model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}},[r("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[e._v("-- none --")])]),e._v(" "),r("b-form-select",{attrs:{slot:"append",disabled:!e.sortBy},slot:"append",model:{value:e.sortDesc,callback:function(t){e.sortDesc=t},expression:"sortDesc"}},[r("option",{domProps:{value:!1}},[e._v("Asc")]),e._v(" "),r("option",{domProps:{value:!0}},[e._v("Desc")])])],1)],1)],1)],1),e._v(" "),r("b-table",{attrs:{striped:"",bordered:"",small:"",hover:"",items:e.elements.concat(e.newElements),fields:e.fields,filter:e.filter,"sort-by":e.sortBy,"sort-desc":e.sortDesc},on:{"update:sortBy":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t}},scopedSlots:e._u([{key:"actions",fn:function(t){return[r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.formModal",modifiers:{formModal:!0}}],staticClass:"mr-1",attrs:{size:"sm",variant:"warning"},on:{click:function(r){e.formEdit(t.item,t.index,r.target)}}},[e._v("\n          Edit\n        ")]),e._v(" "),0!=e.conf.delete?r("b-button",{staticClass:"mr-1",attrs:{size:"sm",variant:"danger"},on:{click:function(r){r.stopPropagation(),e.destroy(t.item,t.index,r.target)}}},[e._v("\n          Delete\n        ")]):e._e()]}}])})],1),e._v(" "),r("b-modal",{ref:"myFormModalRef",attrs:{id:"formModal",title:e.formTitle}},[e.show?r("b-form",{on:{submit:e.onSubmit,reset:e.onReset}},[e._t("tableForm"),e._v(" "),r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")]),e._v(" "),r("b-button",{attrs:{type:"reset",variant:"danger"}},[e._v("Reset")])],2):e._e()],1)],1)},staticRenderFns:[]},w=r("VU/8")(k,x,!1,null,null,null).exports,M={name:"Movie",components:{"table-template":w},data:function(){return{conf:{title:"Movies List",addMsg:"Add Movie",resource:"movies",formTitle:"Movie"},fetch:{data:[],genres:[]},fields:[{key:"name",label:"Name",sortable:!0},{key:"year",label:"Year",sortable:!0,formatter:this.getFullYear},{key:"director",label:"Director",sortable:!0},{key:"cine_date",label:"Cine",sortable:!0},{key:"status",label:"Status",sortable:!0,formatter:this.getStatus},{key:"genre",label:"Genre",sortable:!0},{key:"actions",label:"Actions",sortable:!1}],form:{id:null,name:"",year:"",director:"",cine_date:"",status:"NW",genre_id:null,user_id:null},statuses:[{text:"Watched",value:"W"},{text:"Not Watched",value:"NW"}],editingIndex:null,newElements:[]}},computed:i()({},Object(l.c)({user:"getUser"}),{elements:function(){return null!=this.fetch.data.movies&&null!=this.fetch.data.movies.movie?this.fetch.data.movies.movie:[]},genres:function(){var e=this,t=[];return t.push({text:"",value:null}),null==this.fetch.genres.genres||null==this.fetch.genres.genres.genre?t:(this.fetch.genres.genres.genre.forEach(function(r){t.push({text:e.getObjectAtt(r,"name"),value:e.getObjectAtt(r,"id")})}),t)}}),methods:{responseIndex:function(e){var t=this;n.get("genres").then(function(r){y.a.xmlDataToJSON(e.data).then(function(e){t.fetch.data=e}),y.a.xmlDataToJSON(r.data).then(function(e){t.fetch.genres=e})}).catch(function(e){console.log(e.response)})},responseEdit:function(e){var t=void 0,r=this.elements.length-1;(t=this.editingIndex>r?this.newElements[this.editingIndex-r-1]:this.elements[this.editingIndex]).name=this.form.name,t.year=this.form.year,t.director=this.form.director,t.cine_date=this.form.cine_date,t.status=this.form.status,t.genre_id=this.form.genre_id,t.genre=this.getObjectAtt(e.data.data,"genre")},getFullYear:function(e){return null!=e&&""!=e?new Date(e).getFullYear():null},getStatus:function(e){return"W"==e?"Watched":"Not Watched"},updateEditingForm:function(e,t){this.form={id:this.getObjectAtt(e,"id"),name:this.getObjectAtt(e,"name"),year:this.getObjectAtt(e,"year"),director:this.getObjectAtt(e,"director"),cine_date:this.getObjectAtt(e,"cine_date"),status:this.getObjectAtt(e,"status"),genre_id:this.getObjectAtt(e,"genre_id")},this.editingIndex=t},resetForm:function(){this.form={id:null,name:"",year:"",director:"",cine_date:"",status:"NW",genre_id:null,user_id:null}},getObjectAtt:function(e,t){return Array.isArray(e[t])?e[t][0]:e[t]}}},A={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table-template",{attrs:{conf:e.conf,elements:e.elements,newElements:e.newElements,fields:e.fields,form:e.form,responseIndex:e.responseIndex,responseEdit:e.responseEdit,editingIndex:e.editingIndex,getObjectAtt:e.getObjectAtt,updateEditingForm:e.updateEditingForm,resetForm:e.resetForm}},[r("template",{slot:"tableForm"},[r("b-form-group",{attrs:{id:"movieName",label:"Name","label-for":"movieName"}},[r("b-form-input",{attrs:{id:"movieName",type:"text",required:"",placeholder:"Movie name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"movieYear",label:"Year","label-for":"movieYear"}},[r("b-form-input",{attrs:{id:"movieYear",type:"date",placeholder:"Movie year"},model:{value:e.form.year,callback:function(t){e.$set(e.form,"year",t)},expression:"form.year"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"movieDirector",label:"Director","label-for":"movieDirector"}},[r("b-form-input",{attrs:{id:"movieDirector",type:"text",placeholder:"Movie director"},model:{value:e.form.director,callback:function(t){e.$set(e.form,"director",t)},expression:"form.director"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"movieCineDate",label:"Cine Date","label-for":"movieCineDate"}},[r("b-form-input",{attrs:{id:"movieCineDate",type:"date",placeholder:"Movie cine date"},model:{value:e.form.cine_date,callback:function(t){e.$set(e.form,"cine_date",t)},expression:"form.cine_date"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"movieStatus",label:"Status","label-for":"movieStatus"}},[r("b-form-select",{attrs:{id:"movieStatus",options:e.statuses,required:""},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"movieGenre",label:"Genre","label-for":"movieGenre"}},[r("b-form-select",{attrs:{id:"movieGenre",options:e.genres},model:{value:e.form.genre_id,callback:function(t){e.$set(e.form,"genre_id",t)},expression:"form.genre_id"}})],1)],1)],2)},staticRenderFns:[]},E=r("VU/8")(M,A,!1,null,null,null).exports,O={name:"Genre",components:{"table-template":w},data:function(){return{conf:{title:"Genres List",addMsg:"Add Genre",resource:"genres",formTitle:"Genre",delete:!0},fetch:{data:[]},fields:[{key:"name",label:"Name",sortable:!0},{key:"actions",label:"Actions",sortable:!1}],form:{id:null,name:"",user_id:null},editingIndex:null,newElements:[]}},computed:{elements:function(){return null!=this.fetch.data.genres&&null!=this.fetch.data.genres.genre?this.fetch.data.genres.genre:[]}},methods:{responseIndex:function(e){var t=this;y.a.xmlDataToJSON(e.data).then(function(e){t.fetch.data=e})},responseEdit:function(e){var t=this.elements.length-1;(this.editingIndex>t?this.newElements[this.editingIndex-t-1]:this.elements[this.editingIndex]).name=this.form.name},updateEditingForm:function(e,t){this.form={id:this.getObjectAtt(e,"id"),name:this.getObjectAtt(e,"name")},this.editingIndex=t},resetForm:function(){this.form={id:null,name:"",user_id:null}},getObjectAtt:function(e,t){return Array.isArray(e[t])?e[t][0]:e[t]}}},D={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table-template",{attrs:{conf:e.conf,elements:e.elements,newElements:e.newElements,fields:e.fields,form:e.form,responseIndex:e.responseIndex,responseEdit:e.responseEdit,editingIndex:e.editingIndex,getObjectAtt:e.getObjectAtt,updateEditingForm:e.updateEditingForm,resetForm:e.resetForm}},[r("template",{slot:"tableForm"},[r("b-form-group",{attrs:{id:"genreName",label:"Name","label-for":"genreName"}},[r("b-form-input",{attrs:{id:"genreName",type:"text",required:"",placeholder:"Genre name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1)],2)},staticRenderFns:[]},R=r("VU/8")(O,D,!1,null,null,null).exports,S={name:"UserSpy",created:function(){var e=this;n.get("users").then(function(t){y.a.xmlDataToJSON(t.data).then(function(t){e.fetch.data=t})}).catch(function(e){console.log(e.response)})},data:function(){return{fetch:{data:[]},fields:[{key:"name",label:"Name",sortable:!0},{key:"email",label:"Email",sortable:!0},{key:"movies_count",label:"Movies",sortable:!0},{key:"actions",label:"Actions",sortable:!1}],sortBy:null,sortDesc:!1,filter:null,user:null,userMovies:{fetch:{data:[]},fields:[{key:"name",label:"Name",sortable:!0},{key:"year",label:"Year",sortable:!0,formatter:this.getFullYear},{key:"director",label:"Director",sortable:!0},{key:"cine_date",label:"Cine",sortable:!0},{key:"status",label:"Status",sortable:!0,formatter:this.getStatus},{key:"genre",label:"Genre",sortable:!0},{key:"actions",label:"Actions",sortable:!1}],sortBy:null,sortDesc:!1,filter:null,added:[]}}},computed:i()({},Object(l.c)({token:"getToken"}),{elements:function(){return null!=this.fetch.data.users&&null!=this.fetch.data.users.user?this.fetch.data.users.user:[]},sortOptions:function(){return this.fields.filter(function(e){return e.sortable}).map(function(e){return{text:e.label,value:e.key}})},userMoviesElements:function(){return null!=this.userMovies.fetch.data.movies?this.userMovies.fetch.data.movies.movie:[]},userMoviesSortOptions:function(){return this.userMovies.fields.filter(function(e){return e.sortable}).map(function(e){return{text:e.label,value:e.key}})}}),methods:{spyUser:function(e,t){var r=this,s=this.getObjectAtt(e,"id");n.get("users/"+s).then(function(t){y.a.xmlDataToJSON(t.data).then(function(t){r.userMovies.fetch.data=t,r.userMovies.added=[];var s="@"+r.getObjectAtt(e,"name");r.user=s})}).catch(function(e){console.log(e.response)})},spyUsers:function(){this.user=null,this.userMovies.fetch.data=[]},cloneMovie:function(e,t){var r=this;n.post("users/copy",{name:this.getObjectAtt(e,"name"),year:this.getObjectAtt(e,"year"),director:this.getObjectAtt(e,"director"),cine_date:this.getObjectAtt(e,"cine_date"),status:this.getObjectAtt(e,"status"),genre:this.getObjectAtt(e,"genre")}).then(function(t){r.userMovies.added.push(r.getObjectAtt(e,"id"))}).catch(function(e){console.log(e.response)})},getFullYear:function(e){return null!=e&&""!=e?new Date(e).getFullYear():null},getStatus:function(e){return"W"==e?"Watched":"Not Watched"},getObjectAtt:function(e,t){return Array.isArray(e[t])?e[t][0]:e[t]}}},F={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.user?[r("div",{staticClass:"text-center",staticStyle:{"margin-right":"1%"}},[r("b-button",{staticClass:"mr-1",attrs:{size:"md",variant:"info"},on:{click:function(t){return t.stopPropagation(),e.spyUsers(t)}}},[e._v("\n         Go Back to Friends List\n      ")])],1),e._v(" "),r("h1",[e._v("Movies")]),e._v(" "),r("h3",[e._v(e._s(e.user))])]:r("h1",{staticClass:"header"},[e._v("My Friends")]),e._v(" "),e.user?r("b-container",{attrs:{fluid:""}},[r("b-row",[r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Filter"}},[r("b-input-group",[r("b-form-input",{attrs:{placeholder:"Search a Movie"},model:{value:e.userMovies.filter,callback:function(t){e.$set(e.userMovies,"filter",t)},expression:"userMovies.filter"}}),e._v(" "),r("b-input-group-append",[r("b-btn",{attrs:{disabled:!e.userMovies.filter},on:{click:function(t){e.userMovies.filter=""}}},[e._v("Clear")])],1)],1)],1)],1),e._v(" "),r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Sort"}},[r("b-input-group",[r("b-form-select",{attrs:{options:e.userMoviesSortOptions},model:{value:e.userMovies.sortBy,callback:function(t){e.$set(e.userMovies,"sortBy",t)},expression:"userMovies.sortBy"}},[r("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[e._v("-- none --")])]),e._v(" "),r("b-form-select",{attrs:{slot:"append",disabled:!e.userMovies.sortBy},slot:"append",model:{value:e.userMovies.sortDesc,callback:function(t){e.$set(e.userMovies,"sortDesc",t)},expression:"userMovies.sortDesc"}},[r("option",{domProps:{value:!1}},[e._v("Asc")]),e._v(" "),r("option",{domProps:{value:!0}},[e._v("Desc")])])],1)],1)],1)],1),e._v(" "),r("b-table",{attrs:{striped:"",bordered:"",small:"",hover:"",items:e.userMoviesElements,fields:e.userMovies.fields,filter:e.userMovies.filter,"sort-by":e.userMovies.sortBy,"sort-desc":e.userMovies.sortDesc},on:{"update:sortBy":function(t){e.$set(e.userMovies,"sortBy",t)},"update:sortDesc":function(t){e.$set(e.userMovies,"sortDesc",t)}},scopedSlots:e._u([{key:"actions",fn:function(t){return[e.userMovies.added.includes(e.getObjectAtt(t.item,"id"))?r("b-btn",{attrs:{disabled:"",variant:"info"}},[e._v("\n          Added\n        ")]):r("b-btn",{attrs:{disabled:!e.token,variant:"info"},on:{click:function(r){e.cloneMovie(t.item,t.index,r.target)}}},[e._v("\n          Add to my List\n        ")])]}}])})],1):r("b-container",{attrs:{fluid:""}},[r("b-row",[r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Filter"}},[r("b-input-group",[r("b-form-input",{attrs:{placeholder:"Search an User"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),e._v(" "),r("b-input-group-append",[r("b-btn",{attrs:{disabled:!e.filter},on:{click:function(t){e.filter=""}}},[e._v("Clear")])],1)],1)],1)],1),e._v(" "),r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Sort"}},[r("b-input-group",[r("b-form-select",{attrs:{options:e.sortOptions},model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}},[r("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[e._v("-- none --")])]),e._v(" "),r("b-form-select",{attrs:{slot:"append",disabled:!e.sortBy},slot:"append",model:{value:e.sortDesc,callback:function(t){e.sortDesc=t},expression:"sortDesc"}},[r("option",{domProps:{value:!1}},[e._v("Asc")]),e._v(" "),r("option",{domProps:{value:!0}},[e._v("Desc")])])],1)],1)],1)],1),e._v(" "),r("b-table",{attrs:{striped:"",bordered:"",small:"",hover:"",items:e.elements,fields:e.fields,filter:e.filter,"sort-by":e.sortBy,"sort-desc":e.sortDesc},on:{"update:sortBy":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t}},scopedSlots:e._u([{key:"actions",fn:function(t){return[r("b-button",{staticClass:"mr-1",attrs:{size:"sm",variant:"info"},on:{click:function(r){r.stopPropagation(),e.spyUser(t.item,t.index,r.target)}}},[e._v("\n          Spy\n        ")])]}}])})],1)],2)},staticRenderFns:[]};var j=r("VU/8")(S,F,!1,function(e){r("6GAL")},"data-v-fa83bf20",null).exports;s.a.use(b.a);var T=new b.a({routes:[{path:"/",component:g,name:"index"},{path:"/movies",component:E,name:"movie"},{path:"/genres",component:R,name:"genre"},{path:"/users",component:j,name:"user.spy"},{path:"*",redirect:{name:"index"}}]}),C=r("e6fC"),I=r("mvHQ"),N=r.n(I);s.a.use(l.a);var $=localStorage.getItem("token"),U=JSON.parse(localStorage.getItem("user")),B=new l.a.Store({state:{auth:{token:$,user:{id:null!=U?U.id:null,name:null!=U?U.name:null,email:null!=U?U.email:null}}},getters:{getToken:function(e){return e.auth.token},getUser:function(e){return e.auth.user}},mutations:{setToken:function(e,t){e.auth.token=t},setUser:function(e,t){e.auth.user=i()({},t)}},actions:{setToken:function(e,t){var r=e.commit;localStorage.setItem("token",t),n.defaults.headers.Authorization="Bearer "+t,r("setToken",t)},setUser:function(e,t){var r=e.commit;localStorage.setItem("user",N()(t)),r("setUser",t)},clearAuth:function(e){var t=e.commit;localStorage.removeItem("token"),localStorage.removeItem("user"),n.defaults.headers.Authorization=null,t("setToken",null),t("setUser",{id:null,name:null,email:null})}}});r("Jmt5"),r("9M+g");s.a.config.productionTip=!1,s.a.use(C.a),new s.a({el:"#app",router:T,store:B,components:{App:p},template:"<App/>"})},PQqf:function(e,t){},TE9p:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c2e89c0ce76fcf8bdb5b.js.map