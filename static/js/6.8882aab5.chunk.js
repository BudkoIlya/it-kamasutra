(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[6],{383:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(0);var r=n(28),s=n(18),c=n(3),i=function(e){return{isAuth:e.auth.isAuth}};function a(e){return Object(r.b)(i)((function(t){return t.isAuth?Object(c.jsx)(e,{}):Object(c.jsx)(s.a,{to:"/login"})}))}},386:function(e,t,n){"use strict";t.a=n.p+"static/media/user.fedbf887.png"},400:function(e,t,n){e.exports={users:"Users_users__2dW9y",user:"Users_user__1moQy",photo:"Users_photo__3MBlC"}},409:function(e,t,n){"use strict";n.r(t),n.d(t,"UserPageAuthRedirect",(function(){return C}));var r=n(0),s=n(28),c=n(384),i=n(185),a=n(407),o=n(3),l=function(e){var t=e.totalItemsCount,n=e.pageSize,r=e.isFetching,s=e.filter,c=e.onChange;return Object(o.jsx)("div",{children:Object(o.jsx)(a.a,{disabled:r,defaultCurrent:1,total:t,showSizeChanger:!1,pageSize:n,onChange:function(e){return c(e,s)}})})},u=n(42),d=n(400),j=n.n(d),b=n(386),h=n(141),O=n(66),f=function(e){var t=e.user,n=Object(s.c)(),r=Object(s.d)(O.b);return Object(o.jsxs)("div",{className:j.a.users,children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{children:Object(o.jsx)(u.c,{exact:!0,to:"/profile/".concat(t.id),children:Object(o.jsx)("img",{src:null!=t.photos.small?t.photos.small:b.a,className:j.a.photo,alt:"preloader"})})}),t.followed?Object(o.jsx)("button",{type:"button",disabled:r.some((function(e){return e===t.id})),onClick:function(){var e;e=t.id,n(Object(h.d)(e))},children:"Unfollow"}):Object(o.jsx)("button",{type:"button",disabled:r.some((function(e){return e===t.id})),onClick:function(){var e;e=t.id,n(Object(h.b)(e))},children:"Follow"})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("p",{children:t.name}),Object(o.jsx)("p",{children:"user.status"}),Object(o.jsx)("p",{children:"user.location.city"}),Object(o.jsx)("p",{children:"user.location.country"})]})]},t.id)},p=n(394),m=n(375),x=function(e){var t=e.term,n=e.isFriends,r=e.isFetching,s=e.setQuery,c=e.onFilterChanged;return Object(o.jsx)(p.c,{enableReinitialize:!0,initialValues:{searchUsers:t,friendSelector:n},onSubmit:function(e){var t=e.searchUsers,n=e.friendSelector;c(1,{term:t,isFriends:n})},children:function(e){return Object(o.jsxs)(p.b,{children:[Object(o.jsx)(p.a,{type:"text",name:"searchUsers",placeholder:"Search"}),Object(o.jsxs)(p.a,{component:"select",name:"friendSelector",children:[Object(o.jsx)("option",{value:"all",children:"All"}),Object(o.jsx)("option",{value:"true",children:"Only followed"}),Object(o.jsx)("option",{value:"false",children:"Only unfollowed"})]}),Object(o.jsx)(m.a,{htmlType:"submit",disabled:r,children:"Search"}),Object(o.jsx)(m.a,{name:"reset",onClick:function(){return function(e){c(1,{term:"",isFriends:"all"}),e.resetForm({values:{searchUsers:"",friendSelector:"all"}}),s({page:1,isFriends:"all",term:""})}(e)},disabled:r,children:"Reset"})]})}})},g=function(e){var t=e.currentPage,n=e.pageSize,a=e.isFetching,u=e.filterGetUsers,d=u.isFriends,j=u.term,b=Object(s.d)(O.g),p=Object(s.d)(O.h),m=Object(s.c)(),g=function(e,t){m(Object(h.c)(e,n,t))},F=Object(i.d)({page:i.a,isFriends:i.c,term:i.c}),v=Object(c.a)(F,2),C=v[0],S=v[1];return Object(r.useEffect)((function(){var e=C.term?C.term:"",t=C.isFriends?C.isFriends:"all";m(Object(h.c)(C.page,n,{term:e,isFriends:t}))}),[]),Object(r.useEffect)((function(){S({page:t,isFriends:d,term:j})}),[j,t,d,S]),Object(o.jsxs)("div",{children:[Object(o.jsx)(x,{setQuery:S,term:j,isFriends:d,isFetching:a,onFilterChanged:g}),Object(o.jsx)(l,{filter:{term:j,isFriends:d},isFetching:a,currentPage:t,onChange:g,totalItemsCount:b,pageSize:n}),p.map((function(e){return Object(o.jsx)(f,{user:e},e.id)}))]})},F=n(142),v=n(383),C=Object(v.a)((function(){var e=Object(s.d)(O.c),t=Object(s.d)(O.f),n=Object(s.d)(O.d),r=Object(s.d)(O.a),c=Object(s.d)(O.e);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(F.a,{isFetching:e}),Object(o.jsx)(g,{filterGetUsers:{term:t,isFriends:n},pageSize:c,currentPage:r,isFetching:e})]})}))}}]);
//# sourceMappingURL=6.8882aab5.chunk.js.map