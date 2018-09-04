/**
 * Created by hinit on 2018/09/04.
 */
(function(){
	"use strict";

	const header = {
		template:"#tmpl-header"
	};

	const index = {
		template:"#tmpl-index"
	};

	const page = {
		props:{
			id:{
				type:[String,Number],
				required:true
			}
		},
		template:"#tmpl-page"
	};

	const router = new VueRouter({
		routes:[
			{
				name:'index',
				path: '/',
				meta:{
					title:'トップ',
					desc:'トップページです'
				},
				components: {
					header:header,
					content:index
				},
				props:{
					header:false,
					content:false
				}
			},
			{
				name:'page',
				path: '/page/:id',
				meta:{
					title:'個別ページ:id',
					desc:'個別ページです'
				},
				components: {
					header:header,
					content:page
				},
				props:{
					header:false,
					content:true
				}
			}
		],
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			} else {
				return { x: 0, y: 0 }
			}
		}
	});

	const app = new Vue({
		el:'#app',
		router:router,
		mounted: function(){
			var to = this.$route;
			console.log('mounted',to);
			this.createMeta(to);
		},
		watch: {
			'$route' (to, from) {
				console.log('watch',to);
				this.createMeta(to);
			}
		},
		methods:{
			createMeta : function(to){
				// タイトルを設定
				if(to.meta.title){
					var setTitle = to.meta.title + ' | サイト名';
					document.title = setTitle;
				} else {
					document.title = 'サイト名'
				}

				// メタタグdescription設定
				if(to.meta.desc){
					var setDesc = to.meta.desc;
					document.querySelector("meta[name='description']").setAttribute('content', setDesc)
				} else {
					document.querySelector("meta[name='description']").setAttribute('content', '')
				}
			}
	}

	});

}).call(this);