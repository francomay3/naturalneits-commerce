import { Text, Title } from "@mantine/core";

const page = () => {
  // TODO: add a photo of natasha. maybe as a hero image.
  return (
    <section>
      <Title order={1} mb="20" ta="center">
        About
      </Title>
      <Text>
        Hi! I'm Natasha. I sew everything you see here. By hand, at home, often
        with a cup of tea nearby and my little one playing at my feet.
      </Text>
      <Text>
        This shop grew out of a quiet dream: to make simple, beautiful things
        that last. Clothes you can wear every day, made from natural fabrics.
        Pieces that feel like home. I take inspiration from the countryside
        around us. The slow days, the changing seasons, the way things used to
        be made.
      </Text>
      <Text>
        Every garment, every stitch, is done with care. No factories, no
        shortcuts. Just me, my sewing machine, and a deep love for the craft.
      </Text>
      <Text>
        Thank you for being here. I hope you find something that feels just
        right.
      </Text>
    </section>
  );
};

export const dynamic = "force-static";

export default page;
