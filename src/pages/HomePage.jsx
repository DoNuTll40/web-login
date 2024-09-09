import {
  Button,
  ButtonGroup,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import SlideShow from "../components/SlideShow";

export default function HomePage() {
  const data = [
    {
      label: "HTML",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "React",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "Vue",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },

    {
      label: "Angular",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "Svelte",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.
      We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.
      We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.
      We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes.\n\n \t We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <div className="max-w-[80rem] mx-auto px-2">
      <SlideShow />
      <div className="my-4 bg-white shadow-md p-2 rounded-md">
        <p className="text-lg font-bold">หมวดของ</p>
        <div className="my-2">
          <ButtonGroup variant="text">
            <Button>คอมพิวเตอร์</Button>
            <Button>โน๊ตบุ๊ค</Button>
            <Button>มือถือ</Button>
            <Button>อุปกรณ์เสริมคอมพิวเตอร์</Button>
            <Button>Three</Button>
            <Button>Three</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="my-4 bg-white shadow-md p-2 rounded-md">
        <Tabs id="custom-animation" value="html">
          <TabsHeader className="max-w-[450px]">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
