/* eslint-disable max-lines */
export type RandomData = {
	name: string;
	email: string;
	phone: string;
	numberrange: number;
	currency: number;
	country: string;
};

export interface ExampleData {
	id: string;
	content: string;
	tags: Tag[];
	user: User;
}

export interface Tag {
	id: string;
	name: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	age: number;
}

export const OptionsDummy = [
  { value: 'React', label: 'React' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Ember', label: 'Ember' },
  { value: 'Backbone', label: 'Backbone' },
  { value: 'Meteor', label: 'Meteor' },
  { value: 'Aurelia', label: 'Aurelia' },
  { value: 'Polymer', label: 'Polymer' },
  { value: 'Riot', label: 'Riot' },
  { value: 'Mithril', label: 'Mithril' },
  { value: 'Preact', label: 'Preact' },
  { value: 'Inferno', label: 'Inferno' },
  { value: 'Cycle', label: 'Cycle' },
  { value: 'Dojo', label: 'Dojo' },
  { value: 'Ext JS', label: 'Ext JS' },
  { value: 'Sencha Touch', label: 'Sencha Touch' },
  { value: 'Ionic', label: 'Ionic' },
  { value: 'Flutter', label: 'Flutter' },
  { value: 'Xamarin', label: 'Xamarin' },
  { value: 'Qt', label: 'Qt' },
]

export const dummyRandomdata: RandomData[] = [
	{
		name: "Xanthus Hammond",
		email: "amet.metus@aol.ca",
		phone: "+62-525-423-5124",
		numberrange: 9,
		currency: 89.30,
		country: "United States"
	},
	{
		name: "Xena Roach",
		email: "tristique@outlook.net",
		phone: "+62-963-876-9488",
		numberrange: 6,
		currency: 44.32,
		country: "New Zealand"
	},
	{
		name: "Janna Collier",
		email: "mi@outlook.org",
		phone: "+62-113-335-2450",
		numberrange: 0,
		currency: 1.10,
		country: "Belgium"
	},
	{
		name: "Giselle Barrera",
		email: "dolor@hotmail.ca",
		phone: "+62-223-121-0470",
		numberrange: 2,
		currency: 78.96,
		country: "Singapore"
	},
	{
		name: "Amena Parks",
		email: "amet.ornare@hotmail.edu",
		phone: "+62-287-265-7086",
		numberrange: 7,
		currency: 9.91,
		country: "Turkey"
	},
	{
		name: "Cameran Santana",
		email: "risus.quisque@yahoo.org",
		phone: "+62-853-423-8135",
		numberrange: 3,
		currency: 49.73,
		country: "Indonesia"
	},
	{
		name: "Hayley Rodgers",
		email: "faucibus.ut@outlook.com",
		phone: "+62-461-541-5188",
		numberrange: 2,
		currency: 28.42,
		country: "Canada"
	},
	{
		name: "Oliver Singleton",
		email: "magna.duis.dignissim@protonmail.net",
		phone: "+62-857-072-2520",
		numberrange: 1,
		currency: 32.33,
		country: "Mexico"
	},
	{
		name: "Hamilton Clayton",
		email: "feugiat@hotmail.edu",
		phone: "+62-012-638-1887",
		numberrange: 1,
		currency: 37.47,
		country: "Poland"
	},
	{
		name: "Ciaran Berg",
		email: "integer.sem@aol.couk",
		phone: "+62-777-109-1733",
		numberrange: 0,
		currency: 91.49,
		country: "South Africa"
	},
	{
		name: "Price Cervantes",
		email: "erat.nonummy.ultricies@icloud.ca",
		phone: "+62-784-636-2136",
		numberrange: 3,
		currency: 71.49,
		country: "Ukraine"
	},
	{
		name: "Timon Kelley",
		email: "nec.tellus@aol.org",
		phone: "+62-204-792-5569",
		numberrange: 5,
		currency: 6.83,
		country: "Germany"
	},
	{
		name: "Mollie Hopper",
		email: "convallis.in.cursus@aol.com",
		phone: "+62-385-319-0075",
		numberrange: 1,
		currency: 6.68,
		country: "Netherlands"
	},
	{
		name: "Jamalia Mcintyre",
		email: "elit.elit@yahoo.net",
		phone: "+62-717-532-0872",
		numberrange: 9,
		currency: 26.49,
		country: "Indonesia"
	},
	{
		name: "Macaulay Wilkins",
		email: "auctor.quis@hotmail.couk",
		phone: "+62-046-570-4867",
		numberrange: 9,
		currency: 11.00,
		country: "United Kingdom"
	},
	{
		name: "Chester Anthony",
		email: "donec.vitae@protonmail.edu",
		phone: "+62-864-246-8586",
		numberrange: 8,
		currency: 2.56,
		country: "South Korea"
	},
	{
		name: "Hiroko Baldwin",
		email: "lorem@protonmail.net",
		phone: "+62-332-868-5775",
		numberrange: 2,
		currency: 77.67,
		country: "Spain"
	},
	{
		name: "Charde Sloan",
		email: "pellentesque.massa@outlook.couk",
		phone: "+62-564-652-5543",
		numberrange: 10,
		currency: 18.56,
		country: "Singapore"
	},
	{
		name: "August Potter",
		email: "semper@outlook.couk",
		phone: "+62-464-425-6966",
		numberrange: 6,
		currency: 73.05,
		country: "South Africa"
	},
	{
		name: "Austin Huff",
		email: "sagittis@yahoo.net",
		phone: "+62-381-424-8892",
		numberrange: 4,
		currency: 18.66,
		country: "United Kingdom"
	},
	{
		name: "Libby Nielsen",
		email: "sed@protonmail.edu",
		phone: "+62-253-115-7647",
		numberrange: 5,
		currency: 13.95,
		country: "Costa Rica"
	},
	{
		name: "Felicia Matthews",
		email: "adipiscing.non.luctus@icloud.net",
		phone: "+62-317-238-2161",
		numberrange: 6,
		currency: 91.23,
		country: "United States"
	},
	{
		name: "Oscar Lopez",
		email: "nec@icloud.edu",
		phone: "+62-375-160-3162",
		numberrange: 6,
		currency: 78.75,
		country: "Vietnam"
	},
	{
		name: "Myles Petersen",
		email: "at.pede@hotmail.net",
		phone: "+62-574-318-4155",
		numberrange: 1,
		currency: 40.37,
		country: "Mexico"
	},
	{
		name: "Wesley Shannon",
		email: "urna.vivamus@outlook.org",
		phone: "+62-372-122-3360",
		numberrange: 8,
		currency: 95.36,
		country: "Costa Rica"
	},
	{
		name: "Amery Bond",
		email: "bibendum.ullamcorper.duis@hotmail.edu",
		phone: "+62-328-196-6441",
		numberrange: 3,
		currency: 68.05,
		country: "Turkey"
	},
	{
		name: "Jaime Dyer",
		email: "ligula.eu.enim@protonmail.net",
		phone: "+62-313-631-6368",
		numberrange: 8,
		currency: 38.22,
		country: "Pakistan"
	},
	{
		name: "Akeem Valdez",
		email: "ante.bibendum.ullamcorper@hotmail.couk",
		phone: "+62-287-510-3881",
		numberrange: 2,
		currency: 19.60,
		country: "Chile"
	},
	{
		name: "Aileen Potts",
		email: "etiam@icloud.ca",
		phone: "+62-683-657-7074",
		numberrange: 5,
		currency: 29.65,
		country: "Norway"
	},
	{
		name: "Wendy Yang",
		email: "et.rutrum@icloud.edu",
		phone: "+62-362-510-1136",
		numberrange: 7,
		currency: 65.72,
		country: "Singapore"
	},
	{
		name: "Dorothy Ratliff",
		email: "dictum.augue@icloud.edu",
		phone: "+62-184-633-2535",
		numberrange: 6,
		currency: 18.86,
		country: "Indonesia"
	},
	{
		name: "Yardley Gamble",
		email: "et@yahoo.com",
		phone: "+62-714-314-6827",
		numberrange: 2,
		currency: 79.03,
		country: "Ireland"
	},
	{
		name: "Ray Galloway",
		email: "leo@outlook.com",
		phone: "+62-726-815-5839",
		numberrange: 9,
		currency: 11.15,
		country: "Ukraine"
	},
	{
		name: "Mary Lindsey",
		email: "odio.a.purus@yahoo.couk",
		phone: "+62-742-189-4631",
		numberrange: 1,
		currency: 86.66,
		country: "Turkey"
	},
	{
		name: "Thane Duran",
		email: "est@google.edu",
		phone: "+62-227-795-9885",
		numberrange: 8,
		currency: 12.01,
		country: "Italy"
	},
	{
		name: "Chelsea Baird",
		email: "ipsum.primis.in@hotmail.couk",
		phone: "+62-605-613-7000",
		numberrange: 7,
		currency: 22.16,
		country: "Singapore"
	},
	{
		name: "Thomas Hunter",
		email: "ante.dictum@aol.net",
		phone: "+62-470-691-7455",
		numberrange: 1,
		currency: 98.32,
		country: "Costa Rica"
	},
	{
		name: "Melodie Robbins",
		email: "ac@aol.com",
		phone: "+62-147-198-5596",
		numberrange: 2,
		currency: 61.58,
		country: "Ireland"
	},
	{
		name: "Sylvia Fisher",
		email: "non.lobortis@yahoo.com",
		phone: "+62-361-445-2149",
		numberrange: 6,
		currency: 17.20,
		country: "Australia"
	},
	{
		name: "Basia Christensen",
		email: "semper.tellus@google.org",
		phone: "+62-235-874-4183",
		numberrange: 1,
		currency: 48.19,
		country: "Pakistan"
	},
	{
		name: "Danielle Sears",
		email: "lacinia.vitae.sodales@icloud.net",
		phone: "+62-235-833-8047",
		numberrange: 5,
		currency: 20.41,
		country: "South Africa"
	},
	{
		name: "Zelenia Rasmussen",
		email: "feugiat@aol.net",
		phone: "+62-260-543-6295",
		numberrange: 9,
		currency: 42.41,
		country: "Vietnam"
	},
	{
		name: "Nehru Clarke",
		email: "non.luctus@yahoo.couk",
		phone: "+62-712-574-2644",
		numberrange: 9,
		currency: 21.55,
		country: "Colombia"
	},
	{
		name: "Thomas Stanton",
		email: "non.massa@aol.couk",
		phone: "+62-721-366-1742",
		numberrange: 4,
		currency: 62.26,
		country: "South Korea"
	},
	{
		name: "Drake Forbes",
		email: "massa.integer@protonmail.ca",
		phone: "+62-713-541-2134",
		numberrange: 1,
		currency: 62.07,
		country: "Brazil"
	},
	{
		name: "Octavia Mccarty",
		email: "habitant@yahoo.com",
		phone: "+62-118-216-2488",
		numberrange: 7,
		currency: 67.10,
		country: "Germany"
	},
	{
		name: "Lael Meyer",
		email: "nulla.in.tincidunt@aol.edu",
		phone: "+62-887-947-2808",
		numberrange: 6,
		currency: 7.72,
		country: "Chile"
	},
	{
		name: "Keegan Wynn",
		email: "tellus@google.edu",
		phone: "+62-534-395-5737",
		numberrange: 3,
		currency: 95.45,
		country: "Ukraine"
	},
	{
		name: "Macon Solis",
		email: "sit.amet@outlook.com",
		phone: "+62-289-632-8653",
		numberrange: 2,
		currency: 31.08,
		country: "Germany"
	},
	{
		name: "Chaim Morales",
		email: "proin.mi@outlook.org",
		phone: "+62-473-668-6190",
		numberrange: 4,
		currency: 1.43,
		country: "Peru"
	},
	{
		name: "Kirestin Matthews",
		email: "dictum@aol.net",
		phone: "+62-823-564-7458",
		numberrange: 7,
		currency: 76.91,
		country: "Nigeria"
	},
	{
		name: "Vielka Odom",
		email: "tincidunt@hotmail.edu",
		phone: "+62-867-618-4553",
		numberrange: 8,
		currency: 79.99,
		country: "South Africa"
	},
	{
		name: "Simone Vaughn",
		email: "fringilla.cursus.purus@aol.net",
		phone: "+62-992-764-7212",
		numberrange: 7,
		currency: 90.50,
		country: "Brazil"
	},
	{
		name: "Yael Bradshaw",
		email: "eleifend@icloud.com",
		phone: "+62-114-276-9610",
		numberrange: 7,
		currency: 82.35,
		country: "Vietnam"
	},
	{
		name: "Troy Deleon",
		email: "sapien@icloud.org",
		phone: "+62-561-394-4631",
		numberrange: 6,
		currency: 77.29,
		country: "Sweden"
	},
	{
		name: "Xena Gillespie",
		email: "fringilla.est.mauris@yahoo.net",
		phone: "+62-082-341-5398",
		numberrange: 4,
		currency: 17.01,
		country: "France"
	},
	{
		name: "Victor Bush",
		email: "cursus@outlook.com",
		phone: "+62-668-968-7186",
		numberrange: 5,
		currency: 74.92,
		country: "Ireland"
	},
	{
		name: "Daryl Rocha",
		email: "elit.sed@protonmail.edu",
		phone: "+62-517-431-2811",
		numberrange: 9,
		currency: 52.29,
		country: "Indonesia"
	},
	{
		name: "Rogan Horne",
		email: "fermentum.arcu.vestibulum@aol.couk",
		phone: "+62-243-035-4447",
		numberrange: 5,
		currency: 5.01,
		country: "Italy"
	},
	{
		name: "Gary Wright",
		email: "enim.nisl@outlook.net",
		phone: "+62-277-376-9118",
		numberrange: 6,
		currency: 60.84,
		country: "Italy"
	},
	{
		name: "Kevin Potts",
		email: "tempor.est@google.couk",
		phone: "+62-449-120-1924",
		numberrange: 5,
		currency: 82.29,
		country: "Canada"
	},
	{
		name: "Julian Dorsey",
		email: "elementum.lorem@aol.org",
		phone: "+62-251-328-6621",
		numberrange: 8,
		currency: 10.15,
		country: "Brazil"
	},
	{
		name: "Melvin Mcconnell",
		email: "ultricies.sem@aol.com",
		phone: "+62-635-478-4335",
		numberrange: 5,
		currency: 62.93,
		country: "South Africa"
	},
	{
		name: "Brendan Howell",
		email: "lobortis@hotmail.net",
		phone: "+62-974-426-6674",
		numberrange: 3,
		currency: 37.84,
		country: "Austria"
	},
	{
		name: "Sasha Moss",
		email: "facilisis.lorem@hotmail.net",
		phone: "+62-191-897-7538",
		numberrange: 8,
		currency: 22.37,
		country: "Chile"
	},
	{
		name: "Kirsten Beck",
		email: "enim.curabitur@outlook.ca",
		phone: "+62-633-786-1467",
		numberrange: 8,
		currency: 31.41,
		country: "Colombia"
	},
	{
		name: "Walker Pugh",
		email: "molestie.sed.id@yahoo.net",
		phone: "+62-722-632-6538",
		numberrange: 9,
		currency: 63.61,
		country: "France"
	},
	{
		name: "Tamara Cote",
		email: "velit.eget@hotmail.couk",
		phone: "+62-253-241-1085",
		numberrange: 5,
		currency: 89.07,
		country: "Philippines"
	},
	{
		name: "Zelenia Deleon",
		email: "sit@yahoo.com",
		phone: "+62-032-888-6024",
		numberrange: 9,
		currency: 2.65,
		country: "Brazil"
	},
	{
		name: "Athena Perez",
		email: "ullamcorper.nisl@google.ca",
		phone: "+62-840-224-4256",
		numberrange: 4,
		currency: 98.57,
		country: "Belgium"
	},
	{
		name: "Noble Daugherty",
		email: "senectus.et.netus@hotmail.org",
		phone: "+62-163-578-9415",
		numberrange: 0,
		currency: 15.03,
		country: "France"
	},
	{
		name: "Raja Cote",
		email: "augue.id@google.edu",
		phone: "+62-655-835-6544",
		numberrange: 8,
		currency: 44.59,
		country: "Netherlands"
	},
	{
		name: "Morgan Roberts",
		email: "metus@yahoo.couk",
		phone: "+62-941-316-2542",
		numberrange: 3,
		currency: 87.59,
		country: "Vietnam"
	},
	{
		name: "Keely Goodman",
		email: "aliquam.iaculis.lacus@outlook.edu",
		phone: "+62-572-898-0586",
		numberrange: 1,
		currency: 16.07,
		country: "France"
	},
	{
		name: "Susan Lyons",
		email: "class.aptent@protonmail.couk",
		phone: "+62-745-070-7827",
		numberrange: 9,
		currency: 69.75,
		country: "Germany"
	},
	{
		name: "Calvin Stephenson",
		email: "dignissim.maecenas.ornare@outlook.ca",
		phone: "+62-283-678-2358",
		numberrange: 9,
		currency: 86.17,
		country: "Italy"
	},
	{
		name: "Iona Mcclure",
		email: "lacus@aol.couk",
		phone: "+62-763-550-1493",
		numberrange: 3,
		currency: 28.27,
		country: "United Kingdom"
	},
	{
		name: "Bianca Graham",
		email: "fusce.dolor@protonmail.ca",
		phone: "+62-750-173-3081",
		numberrange: 9,
		currency: 57.87,
		country: "South Korea"
	},
	{
		name: "Adam Campos",
		email: "ac.ipsum@yahoo.net",
		phone: "+62-049-282-5441",
		numberrange: 4,
		currency: 61.75,
		country: "South Africa"
	},
	{
		name: "Tamara Parsons",
		email: "egestas.hendrerit.neque@icloud.org",
		phone: "+62-722-548-3689",
		numberrange: 4,
		currency: 28.74,
		country: "Ukraine"
	},
	{
		name: "Zia Sargent",
		email: "senectus.et@google.com",
		phone: "+62-255-263-3565",
		numberrange: 7,
		currency: 66.26,
		country: "Costa Rica"
	},
	{
		name: "Colby Rhodes",
		email: "consequat.nec@icloud.org",
		phone: "+62-646-564-3267",
		numberrange: 9,
		currency: 99.63,
		country: "Sweden"
	},
	{
		name: "Beau Cervantes",
		email: "aliquam@google.couk",
		phone: "+62-525-660-2653",
		numberrange: 7,
		currency: 31.70,
		country: "Philippines"
	},
	{
		name: "Baxter Adams",
		email: "orci.lacus@yahoo.net",
		phone: "+62-873-375-6698",
		numberrange: 5,
		currency: 28.32,
		country: "Philippines"
	},
	{
		name: "Audrey Flynn",
		email: "urna.justo@protonmail.org",
		phone: "+62-819-274-6579",
		numberrange: 0,
		currency: 93.31,
		country: "China"
	},
	{
		name: "Victoria Kent",
		email: "rutrum.non.hendrerit@icloud.com",
		phone: "+62-707-872-4614",
		numberrange: 1,
		currency: 92.00,
		country: "Vietnam"
	},
	{
		name: "Katell Blackwell",
		email: "duis.risus@yahoo.net",
		phone: "+62-833-312-5265",
		numberrange: 2,
		currency: 91.06,
		country: "Spain"
	},
	{
		name: "Zelda Powers",
		email: "pede@icloud.edu",
		phone: "+62-531-618-8378",
		numberrange: 4,
		currency: 30.86,
		country: "Italy"
	},
	{
		name: "Scott Jensen",
		email: "pharetra.felis@google.couk",
		phone: "+62-046-936-6054",
		numberrange: 3,
		currency: 33.91,
		country: "Colombia"
	},
	{
		name: "Martin Gallagher",
		email: "interdum@outlook.net",
		phone: "+62-711-111-4478",
		numberrange: 8,
		currency: 8.69,
		country: "Indonesia"
	},
	{
		name: "Ezekiel Puckett",
		email: "diam.dictum@google.couk",
		phone: "+62-566-646-2112",
		numberrange: 0,
		currency: 71.30,
		country: "Ukraine"
	},
	{
		name: "Oprah Horn",
		email: "mauris.ipsum@hotmail.edu",
		phone: "+62-269-471-7048",
		numberrange: 8,
		currency: 71.81,
		country: "Sweden"
	},
	{
		name: "Nichole Aguirre",
		email: "eget.laoreet.posuere@google.couk",
		phone: "+62-552-806-8276",
		numberrange: 4,
		currency: 15.64,
		country: "Nigeria"
	},
	{
		name: "Gavin Ryan",
		email: "ornare.facilisis@yahoo.couk",
		phone: "+62-024-241-7387",
		numberrange: 3,
		currency: 37.07,
		country: "Mexico"
	},
	{
		name: "Moses Robertson",
		email: "donec@aol.net",
		phone: "+62-059-139-5458",
		numberrange: 1,
		currency: 2.85,
		country: "United States"
	},
	{
		name: "Axel Colon",
		email: "euismod.mauris@protonmail.org",
		phone: "+62-513-660-0059",
		numberrange: 4,
		currency: 19.87,
		country: "Ukraine"
	},
	{
		name: "Imelda Bishop",
		email: "accumsan.neque.et@protonmail.org",
		phone: "+62-247-782-8858",
		numberrange: 10,
		currency: 54.18,
		country: "Nigeria"
	},
	{
		name: "Ashton Ramos",
		email: "sagittis@outlook.com",
		phone: "+62-293-340-3455",
		numberrange: 3,
		currency: 75.52,
		country: "Peru"
	},
	{
		name: "Kenneth Snyder",
		email: "etiam.ligula@aol.com",
		phone: "+62-269-827-7266",
		numberrange: 8,
		currency: 3.31,
		country: "Germany"
	},
	{
		name: "Xenos Norton",
		email: "tellus.aenean@google.com",
		phone: "+62-344-785-2677",
		numberrange: 2,
		currency: 84.24,
		country: "India"
	}
];

export const dummyDataTableData: ExampleData[] = [
  {
    "id": "66b4ef87789510115315b45c",
    "content": "Ad mollit deserunt proident aliqua id. Amet voluptate aliqua culpa reprehenderit eiusmod cupidatat voluptate do veniam consectetur do ad mollit quis.",
    "user": {
      "id": "66b4ef874e0c5b83dd4fd622",
      "name": "Warren Holden",
      "email": "warren_holden@mail.com",
      "age": 22
    },
    "tags": [
      {
        "id": "tech",
        "name": "tech"
      },
      {
        "id": "foods",
        "name": "foods"
      },
      {
        "id": "game",
        "name": "game"
      }
    ]
  },
  {
    "id": "66b4ef8776b9d29a6ca231e7",
    "content": "Proident sunt sunt consequat ea occaecat proident. Eu est nulla laborum do sunt consectetur irure qui aute culpa officia duis.",
    "user": {
      "id": "66b4ef87e2ce2cb7ebabd5cd",
      "name": "Nelson Short",
      "email": "nelson_short@mail.com",
      "age": 75
    },
    "tags": [
      {
        "id": "tech",
        "name": "tech"
      },
      {
        "id": "ootd",
        "name": "ootd"
      },
      {
        "id": "foods",
        "name": "foods"
      },
    ]
  },
  {
    "id": "66b4ef87a9b095d06645dafb",
    "content": "Laboris proident proident veniam commodo. Ullamco ullamco qui duis sint culpa elit ea laborum labore eu amet ad occaecat.",
    "user": {
      "id": "66b4ef874c08f4dcd48527e9",
      "name": "Lawrence Britt",
      "email": "lawrence_britt@mail.com",
      "age": 45
    },
    "tags": [
      {
        "id": "foods",
        "name": "foods"
      },
      {
        "id": "ootd",
        "name": "ootd"
      },
      {
        "id": "game",
        "name": "game"
      }
    ]
  },
  {
    "id": "66b4ef87df6b90252cfed49b",
    "content": "Lorem do veniam veniam irure adipisicing ea deserunt occaecat non nulla officia reprehenderit. Officia officia esse incididunt laboris cupidatat aliquip sint fugiat magna excepteur.",
    "user": {
      "id": "66b4ef8775794e3edde07216",
      "name": "Carrie Hardin",
      "email": "carrie_hardin@mail.com",
      "age": 65
    },
    "tags": [
      {
        "id": "tech",
        "name": "tech"
      },
      {
        "id": "game",
        "name": "game"
      }
    ]
  },
  {
    "id": "66b4ef8794f5d42412c09ed5",
    "content": "Duis enim quis exercitation laborum commodo amet. Mollit ad Lorem fugiat proident fugiat aute anim fugiat sit sunt.",
    "user": {
      "id": "66b4ef87d55fab9adb1a6074",
      "name": "Susanna Dunn",
      "email": "susanna_dunn@mail.com",
      "age": 59
    },
    "tags": [
      {
        "id": "ootd",
        "name": "ootd"
      }
    ]
  },
  {
    "id": "66b4ef87aaa25a4aac03d5d8",
    "content": "Aute Lorem non ad esse eu qui dolore ad cupidatat culpa ad aute. Nisi quis veniam aute eiusmod ipsum irure cupidatat minim esse incididunt cupidatat mollit consequat dolore.",
    "user": {
      "id": "66b4ef87308d185a9e5e6805",
      "name": "Clarice Ortiz",
      "email": "clarice_ortiz@mail.com",
      "age": 49
    },
    "tags": [
      {
        "id": "game",
        "name": "game"
      }
    ]
  },
  {
    "id": "66b4ef87ce1784e339c7a44f",
    "content": "Laboris in in ullamco proident exercitation. Magna cillum ad irure consequat.",
    "user": {
      "id": "66b4ef870927adc51ade025b",
      "name": "Ursula Blevins",
      "email": "ursula_blevins@mail.com",
      "age": 65
    },
    "tags": [
      {
        "id": "ootd",
        "name": "ootd"
      }
    ]
  },
  {
    "id": "66b4ef87d345dbc66f6d9f7e",
    "content": "Dolore labore occaecat reprehenderit incididunt cupidatat id qui irure et fugiat voluptate ullamco. Laborum dolor laboris velit sit dolor incididunt commodo sint cupidatat in.",
    "user": {
      "id": "66b4ef87cbbc3dcf7f8ca5ac",
      "name": "Marie Morrow",
      "email": "marie_morrow@mail.com",
      "age": 68
    },
    "tags": [
      {
        "id": "game",
        "name": "game"
      },
      {
        "id": "foods",
        "name": "foods"
      },
      {
        "id": "tech",
        "name": "tech"
      }
    ]
  },
  {
    "id": "66b4ef87edba5075b5a79867",
    "content": "Dolore elit et adipisicing elit cillum aliquip consequat exercitation eiusmod. Eu labore laborum et fugiat nisi voluptate.",
    "user": {
      "id": "66b4ef870ca0fa3da1cac3eb",
      "name": "Tonia England",
      "email": "tonia_england@mail.com",
      "age": 40
    },
    "tags": [
      {
        "id": "ootd",
        "name": "ootd"
      },
      {
        "id": "tech",
        "name": "tech"
      }
    ]
  },
  {
    "id": "66b4ef873f0604ad0048af9f",
    "content": "Labore anim id proident id reprehenderit tempor veniam deserunt cillum. Dolor ad duis fugiat nulla ullamco.",
    "user": {
      "id": "66b4ef8729fd9aed37f20c9f",
      "name": "Kemp Haney",
      "email": "kemp_haney@mail.com",
      "age": 23
    },
    "tags": [
      {
        "id": "tech",
        "name": "tech"
      },
      {
        "id": "game",
        "name": "game"
      },
      {
        "id": "ootd",
        "name": "ootd"
      }
    ]
  }
]
