public class Exercise2CountEven {
    public static int countEven(int[] numbers) {
        int evenNumber = 0;
        for (int i = 0; i < numbers.length; ++i) {
            if (numbers[i] % 2 == 0){
                evenNumber++;
            }
        }
        return evenNumber;
    }

    public static void main(String[] args) {
        int[] numbers = {3, 8, 4, 7, 10, 13};

        System.out.println(countEven(numbers)); // expected: 3
    }
}
