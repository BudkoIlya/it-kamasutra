(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{383:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n(0);var s=n(28),i=n(18),c=n(3),r=function(t){return{isAuth:t.auth.isAuth}};function o(t){return Object(s.b)(r)((function(e){return e.isAuth?Object(c.jsx)(t,{}):Object(c.jsx)(i.a,{to:"/login"})}))}},384:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var s=n(140);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],s=!0,i=!1,c=void 0;try{for(var r,o=t[Symbol.iterator]();!(s=(r=o.next()).done)&&(n.push(r.value),!e||n.length!==e);s=!0);}catch(a){i=!0,c=a}finally{try{s||null==o.return||o.return()}finally{if(i)throw c}}return n}}(t,e)||Object(s.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},386:function(t,e,n){"use strict";e.a=n.p+"static/media/user.fedbf887.png"},395:function(t,e,n){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__25vGT",mainPhoto:"ProfileInfo_mainPhoto__UDhfi"}},396:function(t,e,n){t.exports={postBlock:"MyPosts_postBlock__xzf-N",posts:"MyPosts_posts__3QeSo"}},397:function(t,e,n){t.exports={item:"Post_item__23Xka",message:"Post_message__wE2sx",like:"Post_like__2mSqY"}},408:function(t,e,n){"use strict";n.r(e);var s=n(144),i=n(145),c=n(190),r=n(188),o=n(0),a=n.n(o),u=n(28),l=n(18),j=n(17),b=n(8),d=n(384),f=n(395),h=n.n(f),O=n(142),p=n(3),m=function(t){var e=t.status,n=t.updateStatus,s=Object(o.useState)(!1),i=Object(d.a)(s,2),c=i[0],r=i[1],a=Object(o.useState)(e),u=Object(d.a)(a,2),l=u[0],j=u[1];Object(o.useEffect)((function(){j(e)}),[e]);return Object(p.jsx)(p.Fragment,{children:c?Object(p.jsx)("div",{children:Object(p.jsx)("input",{autoFocus:!0,onBlur:function(){r(!1),n(l)},value:l,onChange:function(t){var e=t.target;j(e.value)}})}):Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Status:"}),Object(p.jsx)("span",{onDoubleClick:function(){r(!0)},children:e||"\u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u0443\u0441"})]})})},v=n(386),x=n(186),g=n(48),k=Object(x.a)({form:"profileEdit"})((function(t){var e=t.isOwner,n=t.handleSubmit,s=t.profile;return Object(p.jsxs)("form",{onSubmit:n,children:[e&&Object(p.jsx)("div",{children:Object(p.jsx)("button",{type:"submit",children:"Save"})}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name "}),":"," ",Object(g.a)("Full name","fullName",[],g.b)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"}),":"," ",Object(g.a)("","lookingForAJob",[],g.b,{type:"checkbox"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My Professional skills"}),Object(g.a)("My Professional skills","lookingForAJobDescription",[],g.c)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me"}),":"," ",Object(g.a)("About me","aboutMe",[],g.c)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts"}),":",Object.entries(s.contacts).map((function(t,e){return Object(p.jsxs)("div",{children:[t[0],":"," ",Object(g.a)("Enter contact","contacts.".concat(t[0]),[],g.b)]},String(e))}))]})]})})),P=function(t){var e=t.profile,n=t.isOwner,s=t.handleToggleMode;return Object(p.jsxs)("div",{className:h.a.descriptionBlock,children:[n&&Object(p.jsx)("div",{children:Object(p.jsx)("button",{type:"button",onClick:s,children:"Edit"})}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name "}),": ",e.fullName]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"}),": ",e.lookingForAJob?"yes":"no"]}),e.lookingForAJob&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My Professional skills"}),": ",e.lookingForAJobDescription]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me"}),": ",e.aboutMe]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts"}),":",Object.entries(e.contacts).map((function(t,e){return Object(p.jsx)(y,{contactTitle:t[0],value:t[1]},String(e))}))]})]})},y=function(t){var e=t.contactTitle,n=t.value;return Object(p.jsxs)("div",{children:[e,": ",n]})},S=Object(u.b)((function(t){return{isFetching:t.usersPage.isFetching}}))((function(t){var e=t.profile,n=t.status,s=t.updateStatus,i=t.isFetching,c=t.isOwner,r=t.savePhoto,a=t.saveProfile,u=Object(o.useState)(!1),l=Object(d.a)(u,2),j=l[0],b=l[1];return Object(p.jsx)("div",{children:e?Object(p.jsxs)("div",{className:h.a.descriptionBlock,children:[Object(p.jsx)("img",{alt:"profileImg",src:e.photos.large||v.a,className:h.a.mainPhoto}),c&&Object(p.jsx)("input",{type:"file",onChange:function(t){var e,n=t.target;return(null===(e=n.files)||void 0===e?void 0:e.length)&&r(n.files[0])}}),j?Object(p.jsx)(k,{initialValues:e,profile:e,onSubmit:function(t){a(t).then((function(){b(!1)})).catch((function(t){console.error(t)}))},isOwner:c}):Object(p.jsx)(P,{profile:e,isOwner:c,handleToggleMode:function(){return b(!0)}}),Object(p.jsx)(m,{status:n,updateStatus:s})]}):Object(p.jsx)(O.a,{isFetching:i})})})),_=n(396),A=n.n(_),w=n(397),F=n.n(w),N=function(t){var e=t.message,n=t.id,s=t.likeCounts;return Object(p.jsxs)("div",{className:F.a.item,children:[Object(p.jsxs)("div",{className:F.a.message,children:[Object(p.jsx)("div",{children:Object(p.jsx)("img",{src:"https://i.pinimg.com/originals/2d/0f/50/2d0f50e8e4f6b233c7cf70b4bd36f89c.png",alt:""})}),Object(p.jsx)("p",{children:e})]}),Object(p.jsx)("span",{id:String(n),className:F.a.like,children:"Likes : ".concat(s)})]})},I=n(95),C=Object(I.b)(30),M=a.a.memo((function(t){var e=t.posts,n=t.addPost,s=e.map((function(t){return Object(p.jsx)(N,{message:t.message,likeCounts:t.likeCounts,id:t.id},t.id)}));return Object(p.jsxs)("div",{className:A.a.postBlock,children:[Object(p.jsx)("h3",{children:"My posts"}),Object(p.jsx)("div",{children:Object(p.jsx)(B,{onSubmit:function(t){n(t.newPostBody)}})}),Object(p.jsx)("div",{className:A.a.posts,children:s})]})})),B=Object(x.a)({form:"addPost"})((function(t){var e=t.handleSubmit;return Object(p.jsxs)("form",{onSubmit:e,children:[Object(p.jsx)("div",{children:Object(g.a)("add post","newPostBody",[I.a,C],g.c)}),Object(p.jsx)("div",{children:Object(p.jsx)("button",{type:"submit",children:"Add post"})})]})})),J=M,D=n(143),E=Object(u.b)((function(t){return{posts:t.profilePage.posts}}),{addPost:D.a.addPostActionCreator})(J),T=function(t){return Object(p.jsxs)("div",{children:[Object(p.jsx)(S,Object(b.a)({},t)),Object(p.jsx)(E,{})]})},U=n(383),z=function(t){Object(c.a)(n,t);var e=Object(r.a)(n);function n(){var t;Object(s.a)(this,n);for(var i=arguments.length,c=new Array(i),r=0;r<i;r++)c[r]=arguments[r];return(t=e.call.apply(e,[this].concat(c))).refreshProfile=function(){var e=t.props,n=e.match,s=e.getUsersProfile,i=e.setStatus,c=e.authorizedUserId,r=n.params.userId;r||(r=String(c)),s(Number(r)),i(Number(r))},t}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t){var e=this.props.match.params.userId;t.match.params.userId!==e&&this.refreshProfile()}},{key:"render",value:function(){var t=this.props,e=t.profile,n=t.status,s=t.updateStatus,i=t.savePhoto,c=t.match,r=t.saveProfile;return Object(p.jsx)(T,{savePhoto:i,isOwner:!c.params.userId,profile:e,status:n,updateStatus:s,saveProfile:r})}}]),n}(a.a.Component);e.default=Object(j.d)(U.a,Object(u.b)((function(t){var e=t.profilePage,n=t.auth;return{profile:e.profile,status:e.status,authorizedUserId:n.userId,isAuth:n.isAuth}}),{getUsersProfile:D.c,setStatus:D.f,updateStatus:D.g,savePhoto:D.d,saveProfile:D.e}),l.g)(z)}}]);
//# sourceMappingURL=4.831c3ad2.chunk.js.map