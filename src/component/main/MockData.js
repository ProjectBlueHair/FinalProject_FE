import nextId from "react-id-generator";
//469 words
const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus purus in massa tempor nec feugiat. Sed faucibus turpis in eu mi bibendum neque egestas congue. Ornare arcu odio ut sem nulla pharetra diam sit amet. In tellus integer feugiat scelerisque varius morbi enim nunc. Porta nibh venenatis cras sed felis eget. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Vestibulum lectus mauris ultrices eros in cursus turpis. Duis convallis convallis tellus id interdum. Eu sem integer vitae justo. Viverra mauris in aliquam sem. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Amet risus nullam eget felis eget nunc.
Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Arcu risus quis varius quam quisque id diam vel. Eu feugiat pretium nibh ipsum consequat. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Sem viverra aliquet eget sit amet tellus cras adipiscing. Eget mauris pharetra et ultrices neque ornare aenean euismod. Elementum curabitur vitae nunc sed velit. At elementum eu facilisis sed odio morbi. Sed blandit libero volutpat sed cras ornare arcu. Quis vel eros donec ac odio tempor orci dapibus. At tellus at urna condimentum mattis pellentesque. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Ullamcorper morbi tincidunt ornare massa eget. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Felis bibendum ut tristique et egestas quis. Amet nisl suscipit adipiscing bibendum est ultricies integer. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Faucibus a pellentesque sit amet porttitor eget dolor.
Ut sem viverra aliquet eget. Gravida rutrum quisque non tellus orci ac auctor. Vehicula ipsum a arcu cursus. Varius quam quisque id diam vel quam. Viverra maecenas accumsan lacus vel facilisis volutpat est. Iaculis nunc sed augue lacus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Diam maecenas ultricies mi eget mauris. Tellus mauris a diam maecenas sed enim ut. Neque ornare aenean euismod elementum nisi quis eleifend quam. In massa tempor nec feugiat. Orci ac auctor augue mauris augue neque gravida. Netus et malesuada fames ac turpis egestas integer. Nulla facilisi cras fermentum odio eu. Arcu cursus vitae congue mauris rhoncus. Nibh cras pulvinar mattis nunc sed blandit libero volutpat. Aliquet sagittis id consectetur purus ut faucibus.
Turpis egestas sed tempus urna. Elementum integer enim neque volutpat. Lorem sed risus ultricies tristique nulla aliquet. Pellentesque nec nam aliquam sem. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Tellus in hac habitasse platea dictumst vestibulum. Tincidunt lobortis feugiat vivamus at. Orci eu lobortis elementum nibh tellus. Nam aliquam sem et tortor consequat. Bibendum ut tristique et egestas quis ipsum. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
`;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const mockData = () => {
  const mockTextArr = mockText.split(" ", 451);
  console.log(mockTextArr.length);

  const mockArr = [];

  new Array(100).fill("").map((_, index) => {
    //title
    const ranText =
      mockTextArr[rand(301, 350)] +
      mockTextArr[rand(351, 400)] +
      mockTextArr[rand(401, 450)];

    //nick
    const nickArr = new Array(rand(2, 5)).fill("").map((nick) => {
      return {
        profile: `testRandomPost/${rand(1, 22)}.jpg`,
        nickname: mockTextArr[rand(101, 200)],
      };
    });

    //tag
    const tagArr = new Array(rand(1, 5)).fill("").map((tag) => {
      return mockTextArr[rand(201, 300)];
    });

    mockArr.push({
      id: nextId(),
      postImg: `testRandomPost/${rand(1, 22)}.jpg`,
      title: ranText,
      collabo: [...nickArr],
      tags: [...tagArr],
      view: rand(100, 5000),
      like: rand(100, 5000),
    });
  });
  return mockArr;
};
