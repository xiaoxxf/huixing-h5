<template>
	<head-top goBack='true' :headTitle='homepage'>
    </head-top>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	export default {
    	data(){
            return{
                homepage:'我的主页',
                like:'',
                dataList:'',
                currentPage: 1,
				pageSize: 12,
				like: '',
				loginUser: '',
				persondataList:''
            }
       },
        created(){
           
        },
        mounted(){
            this.$nextTick(()=>{
				this.initData();
//				this.getPersonInfo();
			});
        },
	    components: {
	    	headTop,
	    	footGuide,
	    },

        methods: {
        	async initData(){
        		this.loginUser = getStore('user_id');
				this.currentPage = 1;
				getBoradcastData(this.currentPage,this.pageSize,this.like,this.loginUser).then(res => {
					this.dataList = res.data.datas;
					// 去除HTML标签
					for (var i = 0; i < this.dataList.length; i++) {
						if(this.dataList[i].type != 1){
							this.dataList[i].textContent = this.dataList[i].textContent.replace(/<\/?[^>]*>/g, '').replace(/[|]*\n/, '').replace(/&npsp;/ig, '');
						}
					}
//					console.log(this.dataList)

				}).catch(err => {
					console.log('获取列表数据错误:' + err)
				})
    		
        	
        	},

        	// 计算评分星星
		    countScore: function(rate){
		      var start = 5 - rate;
		      var end = 10 - rate;
		      return '★★★★★☆☆☆☆☆'.slice(start,end);
		    },
        	gotoAddress(path){
        		this.$router.push(path)
        	},
        	// 加载全部/文章/长评、短评
        	changeLike(e){
				if (e) {
					this.like = 1
				}else{
					this.like = ''
				}
			},
        	
        	// 加载更多
			loaderMore(){
				
			}
			
        }
        

    }
</script>

<style>
</style>