import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";

function ListNews() {
const [data, setData] = useState([]);
const readNews = async () => {
const options = {
method: "GET",
url: "/",
params: {
club_ids: "16,3",
locale: "IN",
page_number: "0",
},
headers: {
"x-rapidapi-key": "bff3f8ad89msh5081e04800499adp1634f7jsn605847092b93",
"x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
},
};

    try {
      let data = [
        {
          id: "437842",
          newsHeadline:
            "Bundesliga market values: Wirtz new league MVP - Kane drops, Sancho rebounds with BVB",
          timestamp: 1716980266,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/logo/homepageSmall/l1.png?lm=1525905518",
          newsDate: "May 29, 2024",
          fullNewsDate: "Wednesday, May 29, 2024",
          newsTime: "12:57",
          newsSource: "Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "489 players updated",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/132098-1700211169.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "14",
          newsCategoryTag: "Market Values",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              notTop: [
                "27",
                "15",
                "16",
                "23826",
                "79",
                "24",
                "82",
                "60",
                "18",
                "89",
                "533",
                "167",
                "39",
                "86",
                "3",
                "80",
                "2036",
                "105",
              ],
            },
          },
        },
        {
          id: "425558",
          newsHeadline:
            "Marcel Sabitzer: Dortmund hope Austrian star can fill the Jude Bellingham void",
          timestamp: 1690414200,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/16.png?lm=1396275280",
          newsDate: "Jul 27, 2023",
          fullNewsDate: "Thursday, July 27, 2023",
          newsTime: "01:30",
          newsSource: "Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "From San Diego",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/106987-1711745992.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              notTop: ["985", "631", "77720"],
              top: ["27", "16"],
            },
          },
        },
        {
          id: "425260",
          newsHeadline:
            "Diego Luna: Meet the Real Salt Lake City talent who models his game after Marco Reus",
          timestamp: 1689873000,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/6643.png?lm=1410197995",
          newsDate: "Jul 20, 2023",
          fullNewsDate: "Thursday, July 20, 2023",
          newsTime: "19:10",
          newsSource: "Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Exclusive Interview",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/880626-1711315451.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "1",
          newsCategoryTag: "Interview",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              top: ["67375", "6643"],
              notTop: ["16", "3505", "11946", "218"],
            },
          },
        },
        {
          id: "423486",
          newsHeadline:
            "Bundesliga market values: Kolo Muani continues ascent - Bayern flop Mané drops again",
          timestamp: 1687431600,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/logo/homepageSmall/l1.png?lm=1525905518",
          newsDate: "Jun 22, 2023",
          fullNewsDate: "Thursday, June 22, 2023",
          newsTime: "13:00",
          newsSource: "Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Liverpool target among winners",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/200512-1667830279.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "14",
          newsCategoryTag: "Market Values",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              notTop: [
                "24",
                "18",
                "23826",
                "89",
                "60",
                "15",
                "82",
                "39",
                "3",
                "533",
                "86",
                "80",
                "167",
                "79",
                "33",
                "44",
              ],
              top: ["27", "16"],
            },
          },
        },
        {
          id: "423200",
          newsHeadline:
            "Edson Álvarez: Dortmund want Ajax star as Jude Bellingham replacement",
          timestamp: 1686947267,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/16.png?lm=1396275280",
          newsDate: "Jun 16, 2023",
          fullNewsDate: "Friday, June 16, 2023",
          newsTime: "22:27",
          newsSource: "De Telegraaf/Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Initial bid made",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/401356-1698343328.jpeg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              top: ["610", "16"],
              notTop: ["6303"],
            },
          },
        },
        {
          id: "421511",
          newsHeadline:
            "Mahmoud Dahoud: Can Brighton finally unleash the Gündogan-esque potential? ",
          timestamp: 1686924000,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/1237.png?lm=1492718902",
          newsDate: "Jun 16, 2023",
          fullNewsDate: "Friday, June 16, 2023",
          newsTime: "16:00",
          newsSource: "Sport1/Romano/TM",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Deal official",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/191422-1706694591.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "1",
          newsUpdateFlag: "1",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              top: ["16", "1237"],
            },
          },
        },
        {
          id: "421144",
          newsHeadline:
            "Jude Bellingham: How will the Dortmund star fit in at Real Madrid?",
          timestamp: 1686144006,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/418.png?lm=1697726166",
          newsDate: "Jun 7, 2023",
          fullNewsDate: "Wednesday, June 7, 2023",
          newsTime: "15:20",
          newsSource: "Romano/Berger/Bild/TM",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Done deal!",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/581678-1693987944.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "1",
          newsUpdateFlag: "1",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              top: ["16", "418"],
              notTop: ["31", "281"],
            },
          },
        },
        {
          id: "421599",
          newsHeadline:
            "Edson Álvarez: Dortmund or Bayern? The best fit for the Ajax midfielder analyzed ",
          timestamp: 1684178477,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/logo/homepageSmall/l1.png?lm=1525905518",
          newsDate: "May 15, 2023",
          fullNewsDate: "Monday, May 15, 2023",
          newsTime: "21:21",
          newsSource: "De Telegraaf/Transfermarkt",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Mexican star on the move?",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/401356-1698343328.jpeg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              top: ["610", "16", "27"],
              notTop: ["631", "3631"],
            },
          },
        },
        {
          id: "421425",
          newsHeadline:
            "Elye Wahi: The Montpellier star is one to watch ahead of a hot transfer summer",
          timestamp: 1683760973,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/969.png?lm=1720105465",
          newsDate: "May 11, 2023",
          fullNewsDate: "Thursday, May 11, 2023",
          newsTime: "01:22",
          newsSource: "Transfermarkt/Foot Mercato",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "Four goals against Lyon",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/659542-1692791720.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "107",
          newsCategoryTag: "Rising Stars",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              notTop: ["11", "24", "631", "762", "1082", "27", "16", "23826"],
              top: ["969"],
            },
          },
        },
        {
          id: "421379",
          newsHeadline:
            "Christian Pulisic: What is next for Chelsea's American star?",
          timestamp: 1683665392,
          newsSecondImage:
            "https://tmssl.akamaized.net/images/wappen/homepageSmall/631.png?lm=1682435911",
          newsDate: "May 9, 2023",
          fullNewsDate: "Tuesday, May 9, 2023",
          newsTime: "22:49",
          newsSource: "Transfermarkt/Daily Mail/ESPN",
          newsStartPageFlag: null,
          newsShortMessageFlag: null,
          newsTeaser: "USMNT star",
          newsFirstImage:
            "https://img.a.transfermarkt.technology/portrait/medium/315779-1691696699.jpg?lm=1",
          newsSpotlightFirstImage: "",
          newsSpotlightSecondImage: "",
          newsCategoryID: "0",
          newsCategoryTag: "News",
          newsTickerFlag: "0",
          newsUpdateFlag: "0",
          newsAdFlag: "0",
          spotlightPriority: "",
          tags: {
            clubs: {
              notTop: ["6195", "506", "16", "5"],
              top: ["631"],
            },
          },
        },
      ];
      setData(data);
      //   const response = await axios.request(options);
      //   setData(response.data.data);
    } catch (error) {
      console.error(error);
    }

};
useEffect(() => {
readNews();
}, []);
console.log(data);
return (
<Container className="mt-5">
<Row className="justify-content-center">
{data.map((el) => (
<Card
className="m-3 d-flex justify-content-center"
style={{ width: "18rem" }}
key={el.id} >
<Card.Img variant="top" src={el.newsFirstImage} />
<Card.Body>
<Card.Text>{el.newsHeadline}</Card.Text>
</Card.Body>
<ListGroup className="list-group-flush">
<ListGroup.Item>date: {el.fullNewsDate}</ListGroup.Item>
<ListGroup.Item>source: {el.newsSource}</ListGroup.Item>
</ListGroup>
</Card>
))}
</Row>
</Container>
);
}

export default ListNews;
