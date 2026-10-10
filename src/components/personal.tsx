import { activities } from "@/content/site";
export function PersonalParagraph() {
  return (
    <p>
      Outside research and coding, I row with{" "}
      <a href={activities.rowing}>Illini Rowing at UIUC</a> and previously
      served as a team leader on{" "}
      <a href={activities.dragonBoat}>Tongji University’s dragon boat team</a>.
      I also enjoy game development, interactive storytelling, and writing
      classical Chinese poetry.
    </p>
  );
}
