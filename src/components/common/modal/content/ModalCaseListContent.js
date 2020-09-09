import React from 'react';
import { CaseLoadListForm } from 'components/common/form';
import { CaseListLoadContainer } from 'containers/case';


// function ModalCaseListContent(props) {
//   return <CaseLoadListForm {...props} />
// }

function ModalCaseListContent(props) {
  return <CaseListLoadContainer  {...props} />
}


export default ModalCaseListContent;



// import { getScrollBottom, preventStickBottom } from 'lib/library';
// import throttle from 'lodash/throttle';




  // prefetch = async () => {
  //   const { posts, prefetching, loading } = this.props;
  //   if (!posts || posts.length === 0 || prefetching || loading) return;
  //   const lastId = posts[posts.length - 1].id;
  //   if (this.props.prefetched) {
  //     // ListingActions.revealPrefetched('recent');
  //     await Promise.resolve(); // next tick
  //   }
  //   if (lastId === this.prevCursor) return;
  //   this.prevCursor = lastId;
  //   try {
  //     // await ListingActions.prefetchRecentPosts(lastId);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   preventStickBottom();
  //   this.onScroll();
  // };


  // function prefetch(){
  //   console.log('prefetch');
  // }
  // const initialize = async () => {
    // console.log('initialize');
    // try {
    //   if (this.props.posts && this.props.posts.length > 0) {
    //     // do not fetch post data when already exists
    //     return;
    //   }
    //   if (!this.props.shouldCancel) {
    //     // await ListingActions.getRecentPosts();
    //   }
    //   this.prefetch();
    // } catch (e) {
    //   console.log(e);
    // }
  // };



  // const onScroll = throttle(() => {
  //   console.log('onscroll');
  //   const scrollBottom = getScrollBottom();
  //   if (scrollBottom > 1000) return;
  //   // this.prefetch();
  //   prefetch()
  // }, 250);

  // const listenScroll = () => {
  //   window.addEventListener('scroll', onScroll);
  // };

  // const unlistenScroll = () => {
  //   window.removeEventListener('scroll', onScroll);
  // };


  // useEffect(()=>{
  //   initialize()
  //   listenScroll()
  //   return ()=>{ 
  //     unlistenScroll()
  //   }
  // },[])