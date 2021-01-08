

const About = () => {
  return (
    <div>
      About wut?
    </div>
  )
}




/* 
^^^^
We recommend using Static Generation (with and without data) 
whenever possible because your page can be built once and served by CDN, 
which makes it much faster than having a server render the page on every request.
*/


// export const getServerSideProps = async() => {
//   // Fetch data from external API
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

/* 
^^^^^
If a page uses Server-side Rendering, 
the page HTML is generated on each request.

To use Server-side Rendering for a page, you 
need to export an async function called getServerSideProps. 
This function will be called by the server on every request.

*/

export default About;


