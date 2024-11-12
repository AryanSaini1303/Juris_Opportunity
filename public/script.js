const description = {
  "Andhra Pradesh": [
    "Known for its rich cultural heritage and history, Andhra Pradesh is famous for Tirupati Temple, the Eastern Ghats, and a significant coastline along the Bay of Bengal.",
    1956,
  ],
  "Arunachal Pradesh": [
    "Located in the northeastern region, Arunachal Pradesh is known for its pristine beauty, Himalayan landscapes, and diverse indigenous cultures.",
    1987,
  ],
  Assam: [
    "Assam is renowned for its tea gardens, the Brahmaputra River, and Kaziranga National Park, home to the one-horned rhinoceros.",
    1947,
  ],
  Bihar: [
    "A historical state, Bihar is the birthplace of Buddhism and Jainism. It houses ancient cities like Patna and Nalanda University.",
    1950,
  ],
  Chandigarh: [
    "A well-planned city, Chandigarh serves as the capital of both Punjab and Haryana and is famous for its architecture, designed by Le Corbusier.",
    1966,
  ],
  Chhattisgarh: [
    "A mineral-rich state, Chhattisgarh is known for its tribal population, dense forests, and waterfalls like Chitrakoot Falls.",
    2000,
  ],
  Delhi: [
    "The National Capital Territory of India, Delhi is a bustling metropolis with rich historical significance, housing landmarks like the Red Fort and India Gate.",
    1956,
  ],
  Goa: [
    "Famous for its beaches and tourism, Goa has a unique Indo-Portuguese culture and history, being a former Portuguese colony until 1961.",
    1987,
  ],
  Gujarat: [
    "Known for its vibrant culture, Gujarat is home to the Gir National Park, the last refuge of Asiatic lions, and the Statue of Unity.",
    1960,
  ],
  Haryana: [
    "Haryana, part of the Delhi NCR, is an agricultural hub, and is historically known for the epic battle of Mahabharata at Kurukshetra.",
    1966,
  ],
  "Himachal Pradesh": [
    "A Himalayan state, Himachal Pradesh is famous for its hill stations like Shimla and Manali, as well as adventure tourism.",
    1971,
  ],
  "Jammu and Kashmir": [
    "After the bifurcation in 2019, Jammu & Kashmir became a UT. It is known for its scenic beauty, religious diversity, and is a major tourist destination.",
    2019,
  ],
  Jharkhand: [
    "Carved out of Bihar, Jharkhand is rich in minerals and forests, and is known for its tribal communities and the city of Ranchi.",
    2000,
  ],
  Karnataka: [
    "Karnataka boasts rich cultural history with ancient temples, IT hubs like Bengaluru, and popular tourist spots like Hampi and Coorg.",
    1956,
  ],
  Kerala: [
    "Known for its backwaters, Ayurveda, and tropical greenery, Kerala has a high literacy rate and is a top tourist destination.",
    1956,
  ],
  "Madhya Pradesh": [
    "Centrally located, Madhya Pradesh is known for its wildlife reserves, historical forts, and ancient temples like Khajuraho.",
    1956,
  ],
  Maharashtra: [
    "Maharashtra, with Mumbai as its capital, is an economic powerhouse, known for Bollywood, historical caves like Ajanta and Ellora, and cultural diversity.",
    1960,
  ],
  Manipur: [
    "A northeastern state, Manipur is known for its scenic landscapes, Loktak Lake, and vibrant cultural festivals.",
    1972,
  ],
  Mizoram: [
    "Mizoram, with its rolling hills and pleasant climate, is culturally distinct with a predominantly tribal population.",
    1987,
  ],
  Nagaland: [
    "Located in the northeastern region, Nagaland is home to diverse tribes, each with their own rich traditions, art, and festivals.",
    1962,
  ],
  Odisha: [
    "Odisha is known for its ancient temples, especially the Jagannath Temple in Puri, as well as its unique coastal landscape and tribal culture.",
    1936,
  ],
  Puducherry: [
    "Known for its French colonial architecture, Puducherry is a coastal UT with a unique blend of Indian and French cultures.",
    1963,
  ],
  Punjab: [
    "Punjab, a major agricultural state, is known for its Sikh heritage, Golden Temple in Amritsar, and vibrant cultural festivals like Baisakhi.",
    1966,
  ],
  Rajasthan: [
    "The largest Indian state by area, Rajasthan is famous for its desert landscapes, royal palaces, and vibrant cultural heritage.",
    1956,
  ],
  Sikkim: [
    "A small Himalayan state, Sikkim is known for its stunning landscapes, Buddhist monasteries, and proximity to Mount Kanchenjunga.",
    1957,
  ],
  "Tamil Nadu": [
    "Tamil Nadu is rich in Dravidian culture and history, with famous temples like Meenakshi Temple and a long coastline along the Bay of Bengal.",
    1956,
  ],
  Telangana: [
    "Formed from Andhra Pradesh, Telangana has a rich history and culture, with Hyderabad as its capital, known for its IT industry and historical landmarks.",
    2014,
  ],
  Tripura: [
    "Located in northeastern India, Tripura has a rich tribal culture and is known for its palaces, wildlife sanctuaries, and the ancient Ujjayanta Palace.",
    1972,
  ],
  "Uttar Pradesh": [
    "Uttar Pradesh is home to several important historical and religious sites, including the Taj Mahal, Varanasi, and Mathura.",
    1950,
  ],
  Uttarakhand: [
    "Known for its Himalayan landscapes, Uttarakhand is a popular destination for spiritual tourism with towns like Rishikesh and Haridwar.",
    2000,
  ],
  "West Bengal": [
    "Known for its literary and artistic heritage, West Bengal is home to Kolkata, the Sundarbans mangrove forest, and historical landmarks.",
    1947,
  ],
  Ladakh: [
    "Carved out from Jammu & Kashmir, Ladakh is known for its stunning landscapes, Buddhist monasteries, and high-altitude deserts.",
    2019,
  ],
  "Andaman Nicobar": [
    "Located in the Bay of Bengal, this archipelago is known for its pristine beaches, marine life, and the historical Cellular Jail.",
    1956,
  ],
  Lakshaydweep: [
    "An archipelago in the Arabian Sea, Lakshadweep is known for its coral reefs, clear waters, and a predominantly Muslim population.",
    1956,
  ],
  Meghalaya: [
    "Known as the 'Abode of Clouds,' Meghalaya is home to lush hills, waterfalls, and Cherrapunji, one of the wettest places on earth.",
    1972,
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Formed by merging the former separate territories of Dadra and Nagar Haveli and Daman and Diu, this UT is known for its beaches and Portuguese heritage.",
    2020,
  ],
  India: [
    "India is a diverse and culturally rich country in South Asia, known for its vibrant traditions, languages, and history. It is the world's largest democracy and home to over 1.4 billion people.",
    1947,
  ],
};
document.addEventListener("mouseover", function (event) {
  var hoverObjectClass = event.target.classList.value;
  if (hoverObjectClass && description[hoverObjectClass]) {
    // Check if description[hoverObjectClass] exists
    // console.log(description[hoverObjectClass]);
    document.getElementById("year").innerText =
      description[hoverObjectClass][1];
    document.getElementById("about").innerText =
      description[hoverObjectClass][0];
    document.getElementById("name").innerText = hoverObjectClass;
  }
});

document.addEventListener("mouseout", function (event) {
  hoverObjectClass = "India";
  // Check if "India" exists in the description object
  if (description[hoverObjectClass]) {
    document.getElementById("year").innerText =
      description[hoverObjectClass][1];
    document.getElementById("about").innerText =
      description[hoverObjectClass][0];
    document.getElementById("name").innerText = hoverObjectClass;
  }
});
