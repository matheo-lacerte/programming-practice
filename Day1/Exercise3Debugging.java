public class Exercise3Debugging {
    public static int calculateTotal(int[] numbers) {
        int total = 0;

        for (int i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }

        return total;
    }

    public static void main(String[] args) {
        int[] numbers = {5, 10, 7, 3};

        System.out.println(calculateTotal(numbers)); // expected: 25
    }
}
