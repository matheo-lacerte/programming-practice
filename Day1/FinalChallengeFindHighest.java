public class FinalChallengeFindHighest {
    public static int findHighest(int[] scores) {
        // TODO: Return the highest number in the array.
        // Bonus: Make sure this works even when all numbers are negative.
        int max = scores[0];
        for (int i = 0; i < scores.length; i++){
            if (max < scores[i]){
                max = scores[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] scores = {72, 91, 63, 88, 97, 54};
        int[] negativeScores = {-20, -7, -35, -4};

        System.out.println(findHighest(scores));         // expected: 97
        System.out.println(findHighest(negativeScores)); // expected: -4
    }
}
