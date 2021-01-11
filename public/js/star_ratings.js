const submitReview = (e) => {
   e.preventDefault();
   console.log("running");
   const review = document.getElementById('review').value;
    const options = {
     method: 'POST',
      body: JSON.stringify({ review }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
    const stars = document.getElementById('stars');
    // console.log(stars);
    //const title = document.getElementById('title');
    //const outline = document.querySelector(':focus');
  
    fetch('/review/:id', options)
      .then(res => res.json())
      .then (response => {
        // console.log(response); 
        const analysis = response.rating;       
        if(analysis === null){
          stars.innerHTML = 'Please write a review :)';
        } 
        else if (analysis < 0) {
          stars.innerHTML = 'Based on your review our system suggests you around <img src="https://img.icons8.com/flat_round/128/000000/one-of-five-stars.png"/>';
        }
        else if (analysis === 0) {
          stars.innerHTML = 'Based on your review our system suggests you around<img src="https://img.icons8.com/flat_round/128/000000/three-of-five-stars.png"/>';
        }
        else if (analysis > 0) {
          stars.innerHTML = 'Based on your review our system suggests you around<img src="https://img.icons8.com/flat_round/128/000000/five-of-five-stars.png"/>';
        }
      })
      .catch(err => {
        stars.innerHTML = 'There was an error processing your request!'
        // console.log("error came");
      })
  }
  document.getElementById('review').addEventListener('keyup', submitReview);
  // document.getElementById('reviewForm').addEventListener('submit', submitReview);