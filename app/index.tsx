// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const generateRandomNumber = (): string => {
  // Tạo số ngẫu nhiên từ 0 đến 999999
  const randomNum = Math.floor(Math.random() * 1000000); // Sinh số ngẫu nhiên từ 0 đến 999999
  return randomNum.toString().padStart(6, '0'); // Đảm bảo chuỗi có 6 ký tự, thêm '0' nếu cần
};

export default function Index() {
  const [randomNumber, setRandomNumber] = useState<string>(''); // Khởi tạo chuỗi số ngẫu nhiên rỗng
  const [inputValue, setInputValue] = useState<string>(''); // Khởi tạo giá trị cho ô input

  const handleGenerateNumber = () => {
    const newNumber = generateRandomNumber(); // Sinh số ngẫu nhiên mới
    setRandomNumber(newNumber); // Cập nhật chuỗi số ngẫu nhiên
    setInputValue(newNumber); // Ghi số vào ô input
  };

  useEffect(() => {
    // Sinh số ngẫu nhiên lần đầu tiên ngay lập tức
    handleGenerateNumber();

    const interval = setInterval(() => {
      handleGenerateNumber(); // Cập nhật chuỗi số ngẫu nhiên mới mỗi 15 giây
    }, 15000); // 15000ms = 15s

    return () => clearInterval(interval); // Dọn dẹp khi component bị tháo rời
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuỗi số ngẫu nhiên</Text>
      <TextInput
        style={styles.input}
        value={inputValue} // Hiển thị số ngẫu nhiên trong ô input
        onChangeText={setInputValue} // Cập nhật giá trị khi người dùng nhập
        editable={false} // Không cho phép chỉnh sửa
      />
      <Button title="Sinh số mới" onPress={handleGenerateNumber} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
    padding: 8,
    fontSize: 24,
    textAlign: 'center',
  },
});
