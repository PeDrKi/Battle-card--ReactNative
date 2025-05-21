import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const characterTranslations = {
  'Peasant': 'Dân thường',
  'Mercenary': 'Lính đánh thuê',
  'Monk': 'Tu sĩ',
  'Archer': 'Cung thủ',
  'Swordman': 'Kiếm sĩ',
  'Priest': 'Giáo sĩ',
  'Swordmaster': 'Kiếm thánh',
  'Gold Arrow': 'Tên Vàng',
  'Paladin': 'Thánh Kỵ sĩ',
  'King Amos': 'Vua Amos',
  'Elf Civilian': 'Dân thường Elf',
  'Elf Archer': 'Cung thủ Elf',
  'Elf Mage': 'Pháp sư Elf',
  'Elf Guard': 'Hộ vệ Elf',
  'Elven Prince Eridan': 'Hoàng tử Elf Eridan',
  'Orc Brute': 'Hung thần Orc',
  'Orc Shaman': 'Pháp sư Orc',
  'Grokk Bonenawer': 'Grokk Kẻ Gặm Xương',
  'Orc Butcher': 'Đồ tể Orc',
  'Iron Tusk Bronir': 'Bronir Ngà Sắt',
  'Void Bug': 'Bọ Hư Không',
  'Void Tentacles': 'Xúc Tu Hư Không',
  'Abyssal Mage': 'Pháp Sư Vực Thẳm',
  'Shadow Hunter': 'Thợ Săn Bóng Tối',
  'Void Soldier': 'Chiến Binh Hư Không',
  'Riftbearer': 'Kẻ Mang Khe Nứt',
  'World Devourer': 'Kẻ Nuốt Chửng Thế Giới',
  'Shadowbound': 'Kẻ Bị Ràng Bó Bóng Tối',
  'Darkrift Behemoth': 'Cự Thú Hố Đen',
  'Eclipse Scavager': 'Kẻ Dọn Xác Nhật Thực',
  'Undead': 'Xác sống',
  'Zombified Soldier': 'Binh sĩ thây ma',
  'Putrid Paladin': 'Thánh Kỵ sĩ Ghê Tởm',
  'Rotten Hound': 'Chó Thối Rữa',
  'Necroman': 'Pháp sư Triệu Hồi Xác',
  'Rak’khar': 'Rak’khar',
  'Commander Dullahan': 'Chỉ Huy Dullahan',
  'Locust Swarm': 'Bầy Châu Chấu',
  'Maddened Rune Bearer': 'Kẻ Mang Bùa Điên Loạn',
  'Undead Berserkers': 'Cuồng Chiến Bất Tử',
};

function translateCharacterPair(name) {
  const vi = characterTranslations[name] || name;
  return `${name}: ${vi}`;
}

const factions = [
  {
    name: 'Vương Quốc Anodir (KA)',
    description: 'Trị vì bởi Vua Amos đệ tam trẻ tuổi - hậu duệ xa của các vị vua từng thống trị Eldoria, liệu dưới sự trị vì của Amos, Anodir có thể vượt qua thời khắc đen tối này?',
    characters: [
      'Peasant', 'Mercenary', 'Monk', 'Archer', 'Swordman', 'Priest',
      'Swordmaster Gauss', 'Gold Arrow Archis', 'Paladin Thorne', 'King Amos'
    ],
  },
  {
    name: 'Rừng Wjisteria (WW)',
    description: 'Hoang dã và thuần khiết, nơi sinh sống của các chủng tộc Elf, Orcs,... Các cá thể sống trong khu rừng này được ban sức mạnh của các rune cổ, từ đó chuyển hóa thành ma pháp.',
    characters: [
      'Elf Civilian', 'Elf Archer', 'Elf Mage', 'Elf Guard', 'Elven Prince Eridan',
      'Orc Brute', 'Orc Shaman', 'Grokk Bonenawer', 'Orc Butcher', 'Iron Tusk Bronir'
    ],
  },
  {
    name: 'Hư Không (VS)',
    description: 'Các quái thú đến từ hư không, sự tồn tại của chúng phục vụ một mục tiêu duy nhất: "Nhấn chìm mọi thứ trở về với hư vô" (All shall return to naught).',
    characters: [
      'Void Bug', 'Void Tentacles', 'Abyssal Mage', 'Shadow Hunter', 'Void Soldier',
      'Riftbearer Bellarahn', 'World Devourer', 'Shadowbound', 'Darkrift Behemoth', 'Eclipse Scavager'
    ],
  },
  {
    name: 'Binh Đoàn Bất Tử (UA)',
    description: 'Sinh ra từ những lời nguyền và sự thối rữa, chúng là hiện thân của những cơn ác mộng bất tận.',
    characters: [
      'Undead', 'Zombified Soldier', 'Putrid Paladin', 'Rotten Hound', 'Necroman',
      'Rak’khar', 'Commander Dullahan', 'Locust Swarm', 'Maddened Rune Bearer', 'Undead Berserkers'
    ],
  },
];

const loreIntro = `Ngàn năm trước, Ano'lor – vị thần rèn huyền thoại – đã tạo ra một chiếc búa mang sức mạnh thay đổi thực tại. Nó được trao cho vị vua vĩ đại của Eldoria, nhưng trong cuộc chiến khốc liệt giữa các thế lực muốn tranh giành sức mạnh, chiếc búa đã bị thất lạc, chìm vào truyền thuyết. 1000 năm sau, Đế chế Eldoria đã tan rã thành 4 thế lực. Những thế lực trỗi dậy để tìm kiếm quyền năng từ quá khứ. Khi lời đồn về sự xuất hiện của chiếc búa Ano'lor lan rộng, bốn phe phái lớn bắt đầu cuộc săn tìm quyết liệt.`;

export default function LoreScreen({ navigation }) {
  const renderFaction = ({ item }) => {
    const midIndex = Math.ceil(item.characters.length / 2);
    const leftCol = item.characters.slice(0, midIndex);
    const rightCol = item.characters.slice(midIndex);

    return (
      <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
        <Text style={[styles.charaTitleText, { color: '#ffd700', fontSize: 18, marginBottom: 10 }]}>
          {item.name}
        </Text>
        <Text style={[styles.charaTitleText, { color: '#000', fontSize: 14, lineHeight: 22, marginBottom: 10 }]}>
          {item.description}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {leftCol.map((character, index) => (
              <Text
                key={`${character}-left-${index}`}
                style={[styles.charaTitleText, { color: '#000', fontSize: 12, marginLeft: 10, marginBottom: 5 }]}
              >
                • {translateCharacterPair(character)}
              </Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {rightCol.map((character, index) => (
              <Text
                key={`${character}-right-${index}`}
                style={[styles.charaTitleText, { color: '#000', fontSize: 12, marginLeft: 10, marginBottom: 5 }]}
              >
                • {translateCharacterPair(character)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Components/Deck.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Text style={styles.title}>LORE</Text>

        <View style={{ flex: 1, paddingBottom: 150, paddingTop: 10 }}>
          <FlatList
            data={factions}
            renderItem={renderFaction}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={
              <Text style={[styles.charaTitleText, {
                color: '#000', fontSize: 16, lineHeight: 24,
                margin: 30, marginBottom: 10
              }]}>
                {loreIntro}
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginVertical: 30,
  },
  charaTitleText: {
    fontFamily: 'serif',
  },
  backButton: {
    position: 'absolute',
    bottom: 75,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    opacity: 0.8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
