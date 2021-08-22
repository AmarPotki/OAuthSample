using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ConsoleClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
        var access=  await  GetToken();
        await GetWeathers(access);
        }

        private static async Task GetWeathers(string accessToken)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var content = await client.GetStringAsync("https://localhost:44314/weatherforecast");
            var model = JsonConvert.DeserializeObject<List<WeatherForecast>>(content);
        }

        private static async Task<string> GetToken()
        {
    

            var plainTextBytes =Encoding.UTF8.GetBytes("m2m:secret");
            var clientPasswordBase64 = Convert.ToBase64String(plainTextBytes);

            var client = new HttpClient {BaseAddress = new Uri("https://demo.identityserver.io")};
            var dict = new Dictionary<string, string>();
            dict.Add("grant_type", "client_credentials");
            dict.Add("scope", "api");
            dict.Add("client_id", "m2m");
            dict.Add("client_secret", "secret");
            var req = new HttpRequestMessage(HttpMethod.Post, "/connect/token") { Content = new FormUrlEncodedContent(dict) }; client.DefaultRequestHeaders.Authorization= new AuthenticationHeaderValue("authorization", $"Basic {clientPasswordBase64}");
            var res = await client.SendAsync(req);
            var content =await res.Content.ReadAsStringAsync();
            var des =JsonConvert.DeserializeObject<dynamic>(content);
            return des.access_token;
        }
    }
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
