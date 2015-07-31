using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Boox.Models;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;

namespace Boox.API
{
    public class AccountController : ApiController
    {
        [NonAction]
        public async Task<Boolean> getAccountByEmail(string email, string password)
        {
            MS_Account account = null;
            using (var db = new BooxEntities()) {
                account = await (db.MS_Account.Where(u => u.email == email).SingleOrDefaultAsync());
                if (account != null && account.password == password) {
                    return true;
                }
            }
            return false;
        }

        // api/account/login/{id}
        [HttpPost]
        public async Task<IHttpActionResult> login([FromBody]string input)
        {
            //open json (not yet)
            JObject account = JObject.Parse(input);
            string email = ((string)account["email"]).ToLower();
            string password = ((string)account["password"]).ToLower();
            Boolean status = await getAccountByEmail(email,password);
            if (status == true) {
                return Ok(new { success = true });
            } else {
                return Ok(new { success = false, message = "email or password is incorrect" });
            }
        }
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        public async Task<IEnumerable<MS_Post>> Get()
        {
            IEnumerable<MS_Post> posts = null;
            using (var db = new BooxEntities()) {
                posts = await (db.MS_Post.ToListAsync());
            }

            return posts;
        }

        // GET api/account/5
        public async Task<MS_Post> Get(string id)
        {
            MS_Post post = null;
            Guid guid_id = new Guid(id);
            using (var db = new BooxEntities()) {
                post = await (db.MS_Post.FindAsync(guid_id));
            }
            return post;
        }

        // POST api/account
        public async void Post([FromBody]string value)
        {
            MS_Post post = new MS_Post();
            post.post_id = Guid.NewGuid();
            System.Diagnostics.Debug.WriteLine(value+"x");
            post.post_content = JObject.Parse(value)["post_content"].ToString();

            using (var db = new BooxEntities()) {
                db.MS_Post.Add(post);
                db.SaveChanges();
            }

            //send notification to firebase
            string input = "{\"id\":\""+post.post_id+"\",\"flag\":\"false\"}";
            using (var client = new HttpClient()) {
                var response = await client.PostAsync("https://amber-inferno-7387.firebaseio.com/notification.json", new StringContent(input));
            }
        }

        // PUT api/account/5
        public async void Put(string id, [FromBody]string value)
        {
            MS_Post post = null;
            Guid guid_id = new Guid(id);
            using (var db = new BooxEntities()) {
                post = await(db.MS_Post.Where(u => u.post_id == guid_id).SingleOrDefaultAsync());
            }

            if (post != null) {
                post.post_content = JObject.Parse(value)["post_content"].ToString();
            }

            using (var db = new BooxEntities()) {
                //must use other dbContext variable
                db.Entry(post).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE api/account/5
        public async void Delete(Guid id)
        {
            MS_Post post = null;
            //Guid guid_id = new Guid(id);
            using (var db = new BooxEntities()) {
                post = await(db.MS_Post.Where(u => u.post_id == id).SingleOrDefaultAsync());
            }
            using (var db = new BooxEntities()) {
                //must use other dbContext variable
                db.Entry(post).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
            }
        }
    }
}
