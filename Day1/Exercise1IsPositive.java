public class Exercise1IsPositive {
    public static boolean isPositive(int number) {
        if ( number > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    public static void main(String[] args) {
        System.out.println(isPositive(10));  // expected: true
        System.out.println(isPositive(-3));  // expected: false
        System.out.println(isPositive(0));   // expected: false
    }
}
