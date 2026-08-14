def calculate(numbers):
    result = []

    for number in numbers:
        if number % 2 == 0:
            result.append(number * 2)

    return result


# Before running this file, answer:
# What does this print?
#
# A) [2, 8, 10]
# B) [4, 16, 20]
# C) [4, 10, 16, 6, 20]
# D) [2, 5, 8, 3, 10]
print(calculate([2, 5, 8, 3, 10]))
# it does A)
# edit I was wrong lol dont know why tho
