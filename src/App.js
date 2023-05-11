import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Eventcalendar,
  Page,
  getJson,
  jalaliCalendar,
  hijriCalendar,
  localeFa,
  localeAr,
} from "@mobiscroll/react";
const ZOHO = window.ZOHO;

function App() {
  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);
  const [zohoLoaded, setZohoLoaded] = React.useState(false);

  React.useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      console.log(data);
    });
    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }, []);

  const [allData, setAllData] = React.useState([]);
  const data = [];
  allData.map((item) => {
    data.push({
      start: item.Start_Date,
      end: item.End_Date,
      title: item.Name,
      color: item.Color,
    });
  });

  React.useEffect(() => {
    if (zohoLoaded) {
      ZOHO.CRM.API.getAllRecords({
        Entity: "TESTS",
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (data) {
        setAllData(data.data);
      });
    }
  }, [zohoLoaded]);

  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);

  return (
    <Page>
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Gregorian calendar</div>
              <Eventcalendar
                theme="ios"
                themeVariant="light"
                clickToCreate={true}
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                eventDelete={true}
                data={data}
                view={view}
              />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Jalali calendar</div>
              <Eventcalendar
                theme="ios"
                themeVariant="light"
                clickToCreate={true}
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                eventDelete={true}
                data={data}
                calendarSystem={jalaliCalendar}
                locale={localeFa}
                view={view}
              />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Hijri calendar</div>
              <Eventcalendar
                theme="ios"
                themeVariant="light"
                clickToCreate={true}
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                eventDelete={true}
                data={data}
                calendarSystem={hijriCalendar}
                locale={localeAr}
                view={view}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
