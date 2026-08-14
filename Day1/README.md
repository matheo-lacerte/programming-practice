# Day 1 - Java Focus

30-minute practice session: methods + parameters.

## How To Use

Work through the files in this order:

1. `Exercise1IsPositive.java`
2. `Exercise2CountEven.java`
3. `Exercise3Debugging.java`
4. `PythonRefresher.py`
5. `FinalChallengeFindHighest.java`

Try each one before checking hints or asking for help. Do not worry about speed; the goal is to practice reading method signatures, writing return values, and testing small chunks of code.

## Run Java Files

From this folder:

```bash
javac Exercise1IsPositive.java
java Exercise1IsPositive
```

Replace the filename/class name for each Java exercise.

## Run Python Refresher

Answer the multiple-choice question first without running it. After you choose, you can run:

```bash
python3 PythonRefresher.py
```

## Mini-Lesson

In Java, a method is similar to a Python function.

Python:

```python
def multiply(a, b):
    return a * b
```

Java:

```java
public static int multiply(int a, int b) {
    return a * b;
}
```

Java requires parameter types and a return type.

```java
public static double calculatePrice(double price, int quantity) {
    return price * quantity;
}
```

If a method returns nothing, use `void`.

```java
public static void sayHello(String name) {
    System.out.println("Hello " + name);
}
```
