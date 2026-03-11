// ===== ALL 57 EXERCISES — Exam Rank 02 =====
const exercises = [
// ==================== LEVEL 1 ====================
{
  name: "first_word",
  level: 1,
  subject: "Write a program that takes a string and displays its first word, followed by a newline. A word is a section of string delimited by spaces/tabs or by the start/end of the string.",
  learn: "Skipping whitespace, finding word boundaries, writing characters one by one with write().",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;

\tif (ac == 2)
\t{
\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\ti++;
\t\twhile (av[1][i] && av[1][i] != ' ' && av[1][i] != '\\t')
\t\t\twrite(1, &av[1][i++], 1);
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Skip all leading spaces and tabs.
2. Print characters one by one until we hit a space, tab, or end of string.
3. Always print a newline at the end.`
},
{
  name: "fizzbuzz",
  level: 1,
  subject: "Write a program that prints numbers from 1 to 100, each separated by a newline. For multiples of 3, print 'fizz'. For multiples of 5, print 'buzz'. For multiples of both, print 'fizzbuzz'.",
  learn: "Modulo operator (%), basic conditionals, printing numbers digit by digit with write().",
  code: `#include <unistd.h>

void\tput_nbr(int n)
{
\tchar c;

\tif (n >= 10)
\t\tput_nbr(n / 10);
\tc = n % 10 + '0';
\twrite(1, &c, 1);
}

int main(void)
{
\tint i = 1;

\twhile (i <= 100)
\t{
\t\tif (i % 3 == 0 && i % 5 == 0)
\t\t\twrite(1, "fizzbuzz", 8);
\t\telse if (i % 3 == 0)
\t\t\twrite(1, "fizz", 4);
\t\telse if (i % 5 == 0)
\t\t\twrite(1, "buzz", 4);
\t\telse
\t\t\tput_nbr(i);
\t\twrite(1, "\\n", 1);
\t\ti++;
\t}
}`,
  explanation: `1. put_nbr() recursively prints each digit of a number.
2. Loop from 1 to 100.
3. Check divisibility: both 3 and 5 first, then 3 only, then 5 only, else print the number.
4. Print newline after each.`
},
{
  name: "ft_strcpy",
  level: 1,
  subject: "Reproduce the behavior of the function strcpy (man strcpy). Your function must be declared as: char *ft_strcpy(char *s1, char *s2);",
  learn: "String copying, null terminator, pointer return.",
  code: `char\t*ft_strcpy(char *s1, char *s2)
{
\tint i = 0;

\twhile (s2[i])
\t{
\t\ts1[i] = s2[i];
\t\ti++;
\t}
\ts1[i] = '\\0';
\treturn (s1);
}`,
  explanation: `1. Copy each character from s2 to s1.
2. When s2 ends (null byte), set s1's null terminator.
3. Return s1 (the destination).`
},
{
  name: "ft_strlen",
  level: 1,
  subject: "Reproduce the behavior of the function strlen (man strlen). Your function must be declared as: int ft_strlen(char *s);",
  learn: "Iterating through a string until null terminator, counting characters.",
  code: `int\tft_strlen(char *s)
{
\tint i = 0;

\twhile (s[i])
\t\ti++;
\treturn (i);
}`,
  explanation: `1. Start counter at 0.
2. Increment while the character is not null.
3. Return the count.`
},
{
  name: "ft_swap",
  level: 1,
  subject: "Write a function that swaps the values of two integers. Your function must be declared as: void ft_swap(int *a, int *b);",
  learn: "Pointers, dereferencing, swapping values using a temp variable.",
  code: `void\tft_swap(int *a, int *b)
{
\tint tmp;

\ttmp = *a;
\t*a = *b;
\t*b = tmp;
}`,
  explanation: `1. Save *a in a temp variable.
2. Set *a to *b.
3. Set *b to the saved temp value.`
},
{
  name: "putstr",
  level: 1,
  subject: "Write a function that displays a string on the standard output. Your function must be declared as: void ft_putstr(char *str);",
  learn: "Using write() to output characters, iterating through a string.",
  code: `#include <unistd.h>

void\tft_putstr(char *str)
{
\twhile (*str)
\t\twrite(1, str++, 1);
}`,
  explanation: `1. While the current character is not null, write it.
2. Advance the pointer with str++.`
},
{
  name: "repeat_alpha",
  level: 1,
  subject: "Write a program that takes a string and displays each alphabetical character repeated N times, where N is its position in the alphabet. 'a'/'A' = 1 time, 'b'/'B' = 2 times, etc.",
  learn: "Alphabet position math, nested output, handling upper and lowercase.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tint n;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] >= 'a' && av[1][i] <= 'z')
\t\t\t\tn = av[1][i] - 'a' + 1;
\t\t\telse if (av[1][i] >= 'A' && av[1][i] <= 'Z')
\t\t\t\tn = av[1][i] - 'A' + 1;
\t\t\telse
\t\t\t\tn = 1;
\t\t\twhile (n--)
\t\t\t\twrite(1, &av[1][i], 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. For each char, compute its alphabet position (a=1, z=26).
2. Non-letters just print once.
3. Print the character that many times.`
},
{
  name: "rev_print",
  level: 1,
  subject: "Write a program that takes a string and displays it in reverse, followed by a newline.",
  learn: "Finding string length, printing backwards with write().",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i;

\tif (ac == 2)
\t{
\t\ti = 0;
\t\twhile (av[1][i])
\t\t\ti++;
\t\twhile (i--)
\t\t\twrite(1, &av[1][i], 1);
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Find end of string by counting to the null byte.
2. Print characters from last to first using i--.`
},
{
  name: "rot_13",
  level: 1,
  subject: "Write a program that takes a string and displays it, replacing each letter by the letter 13 positions later in the alphabet. 'z' wraps to 'm', etc.",
  learn: "ROT13 cipher, modular arithmetic on characters, ASCII manipulation.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tc = av[1][i];
\t\t\tif (c >= 'a' && c <= 'z')
\t\t\t\tc = (c - 'a' + 13) % 26 + 'a';
\t\t\telse if (c >= 'A' && c <= 'Z')
\t\t\t\tc = (c - 'A' + 13) % 26 + 'A';
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. For each letter, subtract base ('a' or 'A'), add 13, mod 26, add base back.
2. This wraps around the alphabet. Non-letters pass through unchanged.`
},
{
  name: "rotone",
  level: 1,
  subject: "Write a program that takes a string and replaces each letter with the next one in the alphabet. 'z' becomes 'a', 'Z' becomes 'A'.",
  learn: "Character shifting, wrapping with modulo or simple conditionals.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tc = av[1][i];
\t\t\tif (c >= 'a' && c <= 'z')
\t\t\t\tc = (c - 'a' + 1) % 26 + 'a';
\t\t\telse if (c >= 'A' && c <= 'Z')
\t\t\t\tc = (c - 'A' + 1) % 26 + 'A';
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Same logic as rot_13 but shift by 1 instead of 13.
2. Modulo 26 handles wrapping z→a.`
},
{
  name: "search_and_replace",
  level: 1,
  subject: "Write a program that takes 3 arguments: a string, a character to find, and a replacement character. Replace every occurrence of the search char and display the result.",
  learn: "Argument parsing, character comparison and replacement.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;

\tif (ac == 4 && av[2][0] && !av[2][1] && av[3][0] && !av[3][1])
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] == av[2][0])
\t\t\t\twrite(1, &av[3][0], 1);
\t\t\telse
\t\t\t\twrite(1, &av[1][i], 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Check we have exactly 3 args and args 2 & 3 are single characters.
2. For each char in string: if it matches the search char, print the replacement. Otherwise print original.`
},
{
  name: "ulstr",
  level: 1,
  subject: "Write a program that takes a string and swaps uppercase letters to lowercase and lowercase to uppercase, then displays the result.",
  learn: "ASCII case conversion: difference between upper/lower is 32.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tc = av[1][i];
\t\t\tif (c >= 'a' && c <= 'z')
\t\t\t\tc -= 32;
\t\t\telse if (c >= 'A' && c <= 'Z')
\t\t\t\tc += 32;
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Lowercase → uppercase: subtract 32 (ASCII difference).
2. Uppercase → lowercase: add 32.
3. Non-letters stay the same.`
},

// ==================== LEVEL 2 ====================
{
  name: "alpha_mirror",
  level: 2,
  subject: "Write a program that takes a string and replaces each letter with its 'mirror' in the alphabet: a↔z, b↔y, c↔x, etc.",
  learn: "Alphabet mirroring formula: mirror = 'a' + 'z' - c (or 'A' + 'Z' - c).",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tc = av[1][i];
\t\t\tif (c >= 'a' && c <= 'z')
\t\t\t\tc = 'z' - c + 'a';
\t\t\telse if (c >= 'A' && c <= 'Z')
\t\t\t\tc = 'Z' - c + 'A';
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Mirror formula: 'z' - c + 'a'. When c='a', result='z'. When c='z', result='a'.
2. Same logic for uppercase with 'Z' and 'A'.`
},
{
  name: "camel_to_snake",
  level: 2,
  subject: "Write a program that takes a camelCase string and converts it to snake_case.",
  learn: "Detecting uppercase letters, inserting underscores, converting to lowercase.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tc = av[1][i];
\t\t\tif (c >= 'A' && c <= 'Z')
\t\t\t{
\t\t\t\twrite(1, "_", 1);
\t\t\t\tc += 32;
\t\t\t}
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. When we encounter an uppercase letter, print an underscore first.
2. Convert the uppercase to lowercase (add 32).
3. Print the now-lowercase character.`
},
{
  name: "do_op",
  level: 2,
  subject: "Write a program that takes 3 arguments: number1 operator number2, and prints the result. Operator is one of: + - * / %",
  learn: "atoi for parsing, switch on operator character, integer arithmetic.",
  code: `#include <stdio.h>
#include <stdlib.h>

int main(int ac, char **av)
{
\tif (ac == 4)
\t{
\t\tint a = atoi(av[1]);
\t\tint b = atoi(av[3]);
\t\tif (av[2][0] == '+') printf("%d", a + b);
\t\telse if (av[2][0] == '-') printf("%d", a - b);
\t\telse if (av[2][0] == '*') printf("%d", a * b);
\t\telse if (av[2][0] == '/') printf("%d", a / b);
\t\telse if (av[2][0] == '%') printf("%d", a % b);
\t}
\tprintf("\\n");
}`,
  explanation: `1. Parse first and third args as integers with atoi().
2. Check the operator character and perform the operation.
3. Print result with printf. (printf is allowed here since do_op's subject permits it.)`
},
{
  name: "ft_atoi",
  level: 2,
  subject: "Write a function that reproduces the behavior of atoi. Your function must be declared as: int ft_atoi(const char *str);",
  learn: "Parsing integers from strings: skip whitespace, handle sign, build number digit by digit.",
  code: `int\tft_atoi(const char *str)
{
\tint i = 0;
\tint sign = 1;
\tint res = 0;

\twhile (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))
\t\ti++;
\tif (str[i] == '-' || str[i] == '+')
\t{
\t\tif (str[i] == '-')
\t\t\tsign = -1;
\t\ti++;
\t}
\twhile (str[i] >= '0' && str[i] <= '9')
\t{
\t\tres = res * 10 + (str[i] - '0');
\t\ti++;
\t}
\treturn (res * sign);
}`,
  explanation: `1. Skip whitespace (space, tabs, newlines: ASCII 9-13 and 32).
2. Handle optional + or - sign.
3. Build the number: multiply result by 10 and add current digit.
4. Return result × sign.`
},
{
  name: "ft_strcmp",
  level: 2,
  subject: "Reproduce the behavior of strcmp. Your function must be declared as: int ft_strcmp(char *s1, char *s2);",
  learn: "String comparison: walk both strings in parallel, return difference at first mismatch.",
  code: `int\tft_strcmp(char *s1, char *s2)
{
\tint i = 0;

\twhile (s1[i] && s1[i] == s2[i])
\t\ti++;
\treturn ((unsigned char)s1[i] - (unsigned char)s2[i]);
}`,
  explanation: `1. Walk both strings while characters are equal and not null.
2. Return the difference between first mismatching characters.
3. Cast to unsigned char for correct behavior with special characters.`
},
{
  name: "ft_strcspn",
  level: 2,
  subject: "Reproduce the behavior of strcspn. Returns the length of the initial segment of s that does NOT contain any character from reject.",
  learn: "Nested search: for each char in s, check if it exists in reject.",
  code: `#include <stddef.h>

size_t\tft_strcspn(const char *s, const char *reject)
{
\tsize_t i = 0;
\tsize_t j;

\twhile (s[i])
\t{
\t\tj = 0;
\t\twhile (reject[j])
\t\t{
\t\t\tif (s[i] == reject[j])
\t\t\t\treturn (i);
\t\t\tj++;
\t\t}
\t\ti++;
\t}
\treturn (i);
}`,
  explanation: `1. For each character in s, scan all of reject.
2. If a match is found, return the current index.
3. If we reach the end of s with no match, return the full length.`
},
{
  name: "ft_strdup",
  level: 2,
  subject: "Reproduce the behavior of strdup. Allocate memory and return a duplicate of the string. Your function must be declared as: char *ft_strdup(char *src);",
  learn: "Dynamic memory allocation with malloc, copying strings.",
  code: `#include <stdlib.h>

char\t*ft_strdup(char *src)
{
\tint\ti = 0;
\tchar\t*dup;

\twhile (src[i])
\t\ti++;
\tdup = malloc(i + 1);
\tif (!dup)
\t\treturn (NULL);
\ti = 0;
\twhile (src[i])
\t{
\t\tdup[i] = src[i];
\t\ti++;
\t}
\tdup[i] = '\\0';
\treturn (dup);
}`,
  explanation: `1. Count length of src.
2. Allocate length + 1 (for null terminator).
3. Copy each character.
4. Add null terminator and return.`
},
{
  name: "ft_strpbrk",
  level: 2,
  subject: "Reproduce the behavior of strpbrk. Returns a pointer to the first character in s that matches any character in accept, or NULL.",
  learn: "Nested loop search pattern, returning a pointer into the original string.",
  code: `#include <stddef.h>

char\t*ft_strpbrk(const char *s, const char *accept)
{
\tint i;
\tint j;

\ti = 0;
\twhile (s[i])
\t{
\t\tj = 0;
\t\twhile (accept[j])
\t\t{
\t\t\tif (s[i] == accept[j])
\t\t\t\treturn ((char *)&s[i]);
\t\t\tj++;
\t\t}
\t\ti++;
\t}
\treturn (NULL);
}`,
  explanation: `1. For each character in s, check all characters in accept.
2. If match found, return pointer to that position in s.
3. If no match, return NULL.`
},
{
  name: "ft_strrev",
  level: 2,
  subject: "Write a function that reverses a string in place. Your function must be declared as: char *ft_strrev(char *str);",
  learn: "Two-pointer technique: swap from both ends toward the middle.",
  code: `char\t*ft_strrev(char *str)
{
\tint i = 0;
\tint j = 0;
\tchar tmp;

\twhile (str[j])
\t\tj++;
\tj--;
\twhile (i < j)
\t{
\t\ttmp = str[i];
\t\tstr[i] = str[j];
\t\tstr[j] = tmp;
\t\ti++;
\t\tj--;
\t}
\treturn (str);
}`,
  explanation: `1. Find end of string (j points to last char).
2. Swap str[i] and str[j], move inward.
3. Stop when pointers cross.`
},
{
  name: "ft_strspn",
  level: 2,
  subject: "Reproduce the behavior of strspn. Returns the length of the initial segment of s consisting ONLY of characters from accept.",
  learn: "Opposite of strcspn: count while characters ARE in the set.",
  code: `#include <stddef.h>

size_t\tft_strspn(const char *s, const char *accept)
{
\tsize_t i = 0;
\tsize_t j;
\tint found;

\twhile (s[i])
\t{
\t\tfound = 0;
\t\tj = 0;
\t\twhile (accept[j])
\t\t{
\t\t\tif (s[i] == accept[j])
\t\t\t{
\t\t\t\tfound = 1;
\t\t\t\tbreak ;
\t\t\t}
\t\t\tj++;
\t\t}
\t\tif (!found)
\t\t\treturn (i);
\t\ti++;
\t}
\treturn (i);
}`,
  explanation: `1. For each char in s, check if it's in accept.
2. If NOT found in accept, return current position.
3. If all chars are in accept, return full length.`
},
{
  name: "inter",
  level: 2,
  subject: "Write a program that takes two strings and displays characters that appear in both, without duplicates, in order of first string.",
  learn: "Using a boolean array (256 for ASCII) to track seen/present characters.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint seen[256] = {0};
\tint printed[256] = {0};
\tint i = 0;

\tif (ac == 3)
\t{
\t\twhile (av[2][i])
\t\t\tseen[(unsigned char)av[2][i++]] = 1;
\t\ti = 0;
\t\twhile (av[1][i])
\t\t{
\t\t\tif (seen[(unsigned char)av[1][i]] && !printed[(unsigned char)av[1][i]])
\t\t\t{
\t\t\t\twrite(1, &av[1][i], 1);
\t\t\t\tprinted[(unsigned char)av[1][i]] = 1;
\t\t\t}
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Mark all characters from string 2 in a 'seen' array.
2. Walk string 1: if char is seen AND not yet printed, print it and mark as printed.
3. This gives intersection without duplicates, in order of string 1.`
},
{
  name: "is_power_of_2",
  level: 2,
  subject: "Write a function that checks if a given unsigned int is a power of 2. Return 1 if yes, 0 if no.",
  learn: "Bit manipulation trick: n & (n-1) == 0 for powers of 2.",
  code: `int\tis_power_of_2(unsigned int n)
{
\treturn (n > 0 && (n & (n - 1)) == 0);
}`,
  explanation: `1. A power of 2 in binary has exactly one '1' bit.
2. n & (n-1) clears the lowest set bit. If result is 0 and n > 0, it's a power of 2.`
},
{
  name: "last_word",
  level: 2,
  subject: "Write a program that takes a string and displays its last word followed by a newline.",
  learn: "Working from the end of a string, skipping trailing whitespace.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i;

\tif (ac == 2)
\t{
\t\ti = 0;
\t\twhile (av[1][i])
\t\t\ti++;
\t\ti--;
\t\twhile (i >= 0 && (av[1][i] == ' ' || av[1][i] == '\\t'))
\t\t\ti--;
\t\twhile (i >= 0 && av[1][i] != ' ' && av[1][i] != '\\t')
\t\t\ti--;
\t\ti++;
\t\twhile (av[1][i] && av[1][i] != ' ' && av[1][i] != '\\t')
\t\t\twrite(1, &av[1][i++], 1);
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Go to end of string.
2. Skip trailing whitespace backwards.
3. Skip the last word backwards to find its start.
4. Print from start of last word forward.`
},
{
  name: "max",
  level: 2,
  subject: "Write a function that returns the largest number in an array of ints. Your function must be declared as: int max(int *tab, unsigned int len);",
  learn: "Iterating an array to find the maximum value.",
  code: `int\tmax(int *tab, unsigned int len)
{
\tunsigned int i = 1;
\tint m;

\tif (len == 0)
\t\treturn (0);
\tm = tab[0];
\twhile (i < len)
\t{
\t\tif (tab[i] > m)
\t\t\tm = tab[i];
\t\ti++;
\t}
\treturn (m);
}`,
  explanation: `1. Start with first element as max.
2. Compare each subsequent element; update max if larger.
3. Return max.`
},
{
  name: "print_bits",
  level: 2,
  subject: "Write a function that takes a byte and prints its binary representation (8 characters of '0' or '1'). void print_bits(unsigned char octet);",
  learn: "Bitwise shifting and masking to extract individual bits.",
  code: `#include <unistd.h>

void\tprint_bits(unsigned char octet)
{
\tint i = 7;
\tchar c;

\twhile (i >= 0)
\t{
\t\tc = ((octet >> i) & 1) + '0';
\t\twrite(1, &c, 1);
\t\ti--;
\t}
}`,
  explanation: `1. Loop from bit 7 (MSB) down to bit 0 (LSB).
2. Right-shift by i positions and AND with 1 to get each bit.
3. Add '0' to convert 0/1 to character '0'/'1'.`
},
{
  name: "reverse_bits",
  level: 2,
  subject: "Write a function that takes a byte, reverses its bits, and returns the result. unsigned char reverse_bits(unsigned char octet);",
  learn: "Bit extraction from one end, building result from the other end.",
  code: `unsigned char\treverse_bits(unsigned char octet)
{
\tunsigned char res = 0;
\tint i = 8;

\twhile (i--)
\t{
\t\tres = (res << 1) | (octet & 1);
\t\toctet >>= 1;
\t}
\treturn (res);
}`,
  explanation: `1. Extract lowest bit of octet with (octet & 1).
2. Shift result left and add the extracted bit.
3. Shift octet right. Repeat 8 times.`
},
{
  name: "snake_to_camel",
  level: 2,
  subject: "Write a program that takes a snake_case string and converts it to lowerCamelCase.",
  learn: "Detecting underscores, capitalizing the next letter, skipping the underscore.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tchar c;

\tif (ac == 2)
\t{
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] == '_')
\t\t\t{
\t\t\t\ti++;
\t\t\t\tc = av[1][i] - 32;
\t\t\t\twrite(1, &c, 1);
\t\t\t}
\t\t\telse
\t\t\t\twrite(1, &av[1][i], 1);
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. When we hit an underscore, skip it and capitalize the next letter.
2. Otherwise, print the character as-is.`
},
{
  name: "swap_bits",
  level: 2,
  subject: "Write a function that swaps the first 4 bits with the last 4 bits of a byte. unsigned char swap_bits(unsigned char octet);",
  learn: "Bitwise shifting: left shift for low nibble, right shift for high nibble.",
  code: `unsigned char\tswap_bits(unsigned char octet)
{
\treturn ((octet >> 4) | (octet << 4));
}`,
  explanation: `1. (octet >> 4) moves the high nibble to the low position.
2. (octet << 4) moves the low nibble to the high position.
3. OR them together to combine.`
},
{
  name: "union",
  level: 2,
  subject: "Write a program that takes two strings and displays all unique characters from both, in order of first appearance. No duplicates.",
  learn: "Boolean lookup array for tracking which characters have been printed.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint seen[256] = {0};
\tint i;

\tif (ac == 3)
\t{
\t\ti = 0;
\t\twhile (av[1][i])
\t\t{
\t\t\tif (!seen[(unsigned char)av[1][i]])
\t\t\t{
\t\t\t\twrite(1, &av[1][i], 1);
\t\t\t\tseen[(unsigned char)av[1][i]] = 1;
\t\t\t}
\t\t\ti++;
\t\t}
\t\ti = 0;
\t\twhile (av[2][i])
\t\t{
\t\t\tif (!seen[(unsigned char)av[2][i]])
\t\t\t{
\t\t\t\twrite(1, &av[2][i], 1);
\t\t\t\tseen[(unsigned char)av[2][i]] = 1;
\t\t\t}
\t\t\ti++;
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Walk string 1: print each char if not seen yet, mark as seen.
2. Walk string 2: same logic.
3. Result: all unique chars in order of first appearance.`
},
{
  name: "wdmatch",
  level: 2,
  subject: "Write a program that takes two strings. Print string1 if every character in string1 can be found in string2 in the same order (subsequence check).",
  learn: "Subsequence matching: greedy scan of the second string.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tint j = 0;

\tif (ac == 3)
\t{
\t\twhile (av[1][i] && av[2][j])
\t\t{
\t\t\tif (av[1][i] == av[2][j])
\t\t\t\ti++;
\t\t\tj++;
\t\t}
\t\tif (!av[1][i])
\t\t{
\t\t\ti = 0;
\t\t\twhile (av[1][i])
\t\t\t\twrite(1, &av[1][i++], 1);
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Walk both strings: advance i (in s1) only when characters match, always advance j (in s2).
2. If we consumed all of s1 (s1[i] == null), it's a subsequence — print s1.`
},

// ==================== LEVEL 3 ====================
{
  name: "add_prime_sum",
  level: 3,
  subject: "Write a program that takes a positive integer and displays the sum of all prime numbers less than or equal to it. Display 0 for bad input.",
  learn: "Prime checking, simple trial division, argument parsing.",
  code: `#include <unistd.h>

int is_prime(int n)
{
\tint i = 2;
\tif (n < 2)
\t\treturn (0);
\twhile (i * i <= n)
\t{
\t\tif (n % i == 0)
\t\t\treturn (0);
\t\ti++;
\t}
\treturn (1);
}

void put_nbr(int n)
{
\tchar c;
\tif (n >= 10)
\t\tput_nbr(n / 10);
\tc = n % 10 + '0';
\twrite(1, &c, 1);
}

int ft_atoi(char *s)
{
\tint r = 0;
\twhile (*s >= '0' && *s <= '9')
\t\tr = r * 10 + (*s++ - '0');
\treturn (r);
}

int main(int ac, char **av)
{
\tint n, sum = 0, i = 2;

\tif (ac == 2)
\t{
\t\tn = ft_atoi(av[1]);
\t\twhile (i <= n)
\t\t{
\t\t\tif (is_prime(i))
\t\t\t\tsum += i;
\t\t\ti++;
\t\t}
\t\tput_nbr(sum);
\t}
\telse
\t\twrite(1, "0", 1);
\twrite(1, "\\n", 1);
}`,
  explanation: `1. is_prime: check divisibility from 2 up to √n.
2. Parse the argument, sum all primes up to n.
3. Print the sum.`
},
{
  name: "epur_str",
  level: 3,
  subject: "Write a program that takes a string and displays it with exactly one space between words, no leading or trailing spaces.",
  learn: "Whitespace normalization: track whether we're inside/outside a word.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;

\tif (ac == 2)
\t{
\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\ti++;
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t{
\t\t\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t\t\ti++;
\t\t\t\tif (av[1][i])
\t\t\t\t\twrite(1, " ", 1);
\t\t\t}
\t\t\telse
\t\t\t\twrite(1, &av[1][i++], 1);
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Skip leading whitespace.
2. When hitting whitespace mid-string, skip all of it, then print ONE space (only if there's more text).
3. Otherwise print the character normally.`
},
{
  name: "expand_str",
  level: 3,
  subject: "Write a program that takes a string and displays it with exactly three spaces between each word, no leading or trailing spaces.",
  learn: "Same as epur_str but with 3 spaces instead of 1.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;

\tif (ac == 2)
\t{
\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\ti++;
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t{
\t\t\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t\t\ti++;
\t\t\t\tif (av[1][i])
\t\t\t\t\twrite(1, "   ", 3);
\t\t\t}
\t\t\telse
\t\t\t\twrite(1, &av[1][i++], 1);
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Identical logic to epur_str.
2. Only difference: write 3 spaces instead of 1 between words.`
},
{
  name: "ft_atoi_base",
  level: 3,
  subject: "Write a function that converts a string representing a number in a given base to an integer. int ft_atoi_base(const char *str, int str_base);",
  learn: "Base conversion: digit values for 0-9 and a-f, multiply by base.",
  code: `int\tft_atoi_base(const char *str, int str_base)
{
\tint res = 0;
\tint sign = 1;
\tint digit;

\twhile (*str == ' ' || (*str >= 9 && *str <= 13))
\t\tstr++;
\tif (*str == '-' || *str == '+')
\t{
\t\tif (*str == '-')
\t\t\tsign = -1;
\t\tstr++;
\t}
\twhile (*str)
\t{
\t\tif (*str >= '0' && *str <= '9')
\t\t\tdigit = *str - '0';
\t\telse if (*str >= 'a' && *str <= 'f')
\t\t\tdigit = *str - 'a' + 10;
\t\telse if (*str >= 'A' && *str <= 'F')
\t\t\tdigit = *str - 'A' + 10;
\t\telse
\t\t\tbreak ;
\t\tif (digit >= str_base)
\t\t\tbreak ;
\t\tres = res * str_base + digit;
\t\tstr++;
\t}
\treturn (res * sign);
}`,
  explanation: `1. Skip whitespace, handle sign.
2. For each character, compute its digit value (0-9 or a-f/A-F).
3. If digit >= base, stop. Otherwise: result = result * base + digit.`
},
{
  name: "ft_list_size",
  level: 3,
  subject: "Write a function that returns the number of elements in a linked list. int ft_list_size(t_list *begin_list); (t_list has next pointer)",
  learn: "Linked list traversal: follow next pointers until NULL.",
  code: `typedef struct s_list
{
\tstruct s_list *next;
\tvoid          *data;
}\tt_list;

int\tft_list_size(t_list *begin_list)
{
\tint count = 0;

\twhile (begin_list)
\t{
\t\tcount++;
\t\tbegin_list = begin_list->next;
\t}
\treturn (count);
}`,
  explanation: `1. Start at head, count each node.
2. Follow ->next until NULL.
3. Return count.`
},
{
  name: "ft_range",
  level: 3,
  subject: "Write a function that returns an allocated array of ints from min to max (inclusive). int *ft_range(int start, int end);",
  learn: "Dynamic allocation of arrays, filling with a range of values.",
  code: `#include <stdlib.h>

int\t*ft_range(int start, int end)
{
\tint *arr;
\tint len;
\tint i = 0;

\tlen = (start <= end) ? end - start + 1 : start - end + 1;
\tarr = malloc(sizeof(int) * len);
\tif (!arr)
\t\treturn (NULL);
\twhile (i < len)
\t{
\t\tarr[i] = (start <= end) ? start + i : start - i;
\t\ti++;
\t}
\treturn (arr);
}`,
  explanation: `1. Calculate range length (absolute difference + 1).
2. Allocate array.
3. Fill ascending or descending depending on start vs end.`
},
{
  name: "ft_rrange",
  level: 3,
  subject: "Write a function that returns an allocated array of ints, but in reverse order compared to ft_range. int *ft_rrange(int start, int end);",
  learn: "Same as ft_range but filling from end to start.",
  code: `#include <stdlib.h>

int\t*ft_rrange(int start, int end)
{
\tint *arr;
\tint len;
\tint i = 0;

\tlen = (start <= end) ? end - start + 1 : start - end + 1;
\tarr = malloc(sizeof(int) * len);
\tif (!arr)
\t\treturn (NULL);
\twhile (i < len)
\t{
\t\tarr[i] = (start <= end) ? end - i : end + i;
\t\ti++;
\t}
\treturn (arr);
}`,
  explanation: `1. Same length calculation as ft_range.
2. Fill from end instead of start.
3. If start <= end, go end down. If start > end, go end up.`
},
{
  name: "hidenp",
  level: 3,
  subject: "Write a program that takes two strings. Print 1 if s1 is hidden in s2 (subsequence), 0 otherwise.",
  learn: "Subsequence check: greedy matching.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tint j = 0;

\tif (ac == 3)
\t{
\t\twhile (av[1][i] && av[2][j])
\t\t{
\t\t\tif (av[1][i] == av[2][j])
\t\t\t\ti++;
\t\t\tj++;
\t\t}
\t\tif (!av[1][i])
\t\t\twrite(1, "1", 1);
\t\telse
\t\t\twrite(1, "0", 1);
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Walk s2, advance in s1 only when chars match.
2. If all of s1 consumed → it's a subsequence → print 1.
3. Otherwise print 0.`
},
{
  name: "lcm",
  level: 3,
  subject: "Write a function that returns the Least Common Multiple of two unsigned ints. unsigned int lcm(unsigned int a, unsigned int b);",
  learn: "LCM formula: lcm(a,b) = a / gcd(a,b) * b. GCD via Euclidean algorithm.",
  code: `unsigned int\tlcm(unsigned int a, unsigned int b)
{
\tunsigned int ta = a;
\tunsigned int tb = b;

\tif (a == 0 || b == 0)
\t\treturn (0);
\twhile (ta != tb)
\t{
\t\tif (ta < tb)
\t\t\tta += a;
\t\telse
\t\t\ttb += b;
\t}
\treturn (ta);
}`,
  explanation: `1. Use the approach of incrementing the smaller value by its original.
2. When ta == tb, that's the LCM.
3. If either is 0, LCM is 0.`
},
{
  name: "paramsum",
  level: 3,
  subject: "Write a program that displays the number of arguments passed to it (excluding the program name).",
  learn: "argc counting, simple number printing.",
  code: `#include <unistd.h>

void put_nbr(int n)
{
\tchar c;
\tif (n >= 10)
\t\tput_nbr(n / 10);
\tc = n % 10 + '0';
\twrite(1, &c, 1);
}

int main(int ac, char **av)
{
\t(void)av;
\tput_nbr(ac - 1);
\twrite(1, "\\n", 1);
}`,
  explanation: `1. ac - 1 gives the number of arguments (excluding program name).
2. Print that number.`
},
{
  name: "pgcd",
  level: 3,
  subject: "Write a program that takes two string-arguments representing positive ints and displays their Greatest Common Divisor.",
  learn: "Euclidean algorithm for GCD, atoi for parsing.",
  code: `#include <stdio.h>
#include <stdlib.h>

int main(int ac, char **av)
{
\tint a, b;

\tif (ac == 3)
\t{
\t\ta = atoi(av[1]);
\t\tb = atoi(av[2]);
\t\twhile (b)
\t\t{
\t\t\tint tmp = b;
\t\t\tb = a % b;
\t\t\ta = tmp;
\t\t}
\t\tprintf("%d", a);
\t}
\tprintf("\\n");
}`,
  explanation: `1. Classic Euclidean algorithm: repeatedly replace (a, b) with (b, a % b) until b is 0.
2. When b == 0, a is the GCD.`
},
{
  name: "print_hex",
  level: 3,
  subject: "Write a program that takes a positive int (as string) and displays it in hexadecimal (lowercase).",
  learn: "Base conversion by repeated division, recursion for correct digit order.",
  code: `#include <unistd.h>

void put_hex(int n)
{
\tchar *base = "0123456789abcdef";
\tif (n >= 16)
\t\tput_hex(n / 16);
\twrite(1, &base[n % 16], 1);
}

int ft_atoi(char *s)
{
\tint r = 0;
\twhile (*s >= '0' && *s <= '9')
\t\tr = r * 10 + (*s++ - '0');
\treturn (r);
}

int main(int ac, char **av)
{
\tif (ac == 2)
\t\tput_hex(ft_atoi(av[1]));
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Recursively divide by 16.
2. Use "0123456789abcdef" as lookup for remainder.
3. Recursion ensures digits print in correct order (MSB first).`
},
{
  name: "rstr_capitalizer",
  level: 3,
  subject: "Write a program that capitalizes the last letter of each word, and lowercases all other letters. Words are separated by spaces/tabs.",
  learn: "Detecting word endings (next char is space/tab/null), case conversion.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i;
\tint j = 1;
\tchar c;

\tif (ac < 2)
\t{
\t\twrite(1, "\\n", 1);
\t\treturn (0);
\t}
\twhile (j < ac)
\t{
\t\ti = 0;
\t\twhile (av[j][i])
\t\t{
\t\t\tc = av[j][i];
\t\t\tif (c >= 'A' && c <= 'Z')
\t\t\t\tc += 32;
\t\t\tif ((c >= 'a' && c <= 'z') &&
\t\t\t\t(av[j][i + 1] == ' ' || av[j][i + 1] == '\\t' || !av[j][i + 1]))
\t\t\t\tc -= 32;
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t\twrite(1, "\\n", 1);
\t\tj++;
\t}
}`,
  explanation: `1. First, lowercase every letter.
2. If the letter is followed by space/tab/null, it's the last letter of a word → uppercase it.
3. Process each argument separately with a newline.`
},
{
  name: "str_capitalizer",
  level: 3,
  subject: "Write a program that capitalizes the first letter of each word and lowercases the rest.",
  learn: "Detecting word starts (previous char is space/tab or index 0), case conversion.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i;
\tint j = 1;
\tchar c;

\tif (ac < 2)
\t{
\t\twrite(1, "\\n", 1);
\t\treturn (0);
\t}
\twhile (j < ac)
\t{
\t\ti = 0;
\t\twhile (av[j][i])
\t\t{
\t\t\tc = av[j][i];
\t\t\tif (c >= 'A' && c <= 'Z')
\t\t\t\tc += 32;
\t\t\tif ((c >= 'a' && c <= 'z') &&
\t\t\t\t(i == 0 || av[j][i - 1] == ' ' || av[j][i - 1] == '\\t'))
\t\t\t\tc -= 32;
\t\t\twrite(1, &c, 1);
\t\t\ti++;
\t\t}
\t\twrite(1, "\\n", 1);
\t\tj++;
\t}
}`,
  explanation: `1. Lowercase every letter first.
2. If it's the first char or previous char was space/tab → capitalize.
3. Process each argument with a newline after.`
},
{
  name: "tab_mult",
  level: 3,
  subject: "Write a program that displays the multiplication table of a given number (1 to 9).",
  learn: "Simple loop, number formatting, multiplication.",
  code: `#include <unistd.h>

void put_nbr(int n)
{
\tchar c;
\tif (n >= 10)
\t\tput_nbr(n / 10);
\tc = n % 10 + '0';
\twrite(1, &c, 1);
}

int ft_atoi(char *s)
{
\tint r = 0;
\twhile (*s >= '0' && *s <= '9')
\t\tr = r * 10 + (*s++ - '0');
\treturn (r);
}

int main(int ac, char **av)
{
\tint n, i = 1;

\tif (ac == 2)
\t{
\t\tn = ft_atoi(av[1]);
\t\twhile (i <= 9)
\t\t{
\t\t\tput_nbr(i);
\t\t\twrite(1, " x ", 3);
\t\t\tput_nbr(n);
\t\t\twrite(1, " = ", 3);
\t\t\tput_nbr(i * n);
\t\t\twrite(1, "\\n", 1);
\t\t\ti++;
\t\t}
\t}
\telse
\t\twrite(1, "\\n", 1);
}`,
  explanation: `1. Parse the number argument.
2. Loop i from 1 to 9, printing "i x n = result" each line.`
},

// ==================== LEVEL 4 ====================
{
  name: "flood_fill",
  level: 4,
  subject: "Write a function that fills a zone in a 2D char array. The zone is defined by the character at the given position. void flood_fill(char **tab, t_point size, t_point begin);",
  learn: "Recursive flood fill (BFS/DFS on a grid), struct usage.",
  code: `typedef struct s_point
{
\tint x;
\tint y;
}\tt_point;

void fill(char **tab, t_point size, t_point cur, char target)
{
\tif (cur.x < 0 || cur.y < 0 || cur.x >= size.x || cur.y >= size.y)
\t\treturn ;
\tif (tab[cur.y][cur.x] != target)
\t\treturn ;
\ttab[cur.y][cur.x] = 'F';
\tfill(tab, size, (t_point){cur.x - 1, cur.y}, target);
\tfill(tab, size, (t_point){cur.x + 1, cur.y}, target);
\tfill(tab, size, (t_point){cur.x, cur.y - 1}, target);
\tfill(tab, size, (t_point){cur.x, cur.y + 1}, target);
}

void flood_fill(char **tab, t_point size, t_point begin)
{
\tfill(tab, size, begin, tab[begin.y][begin.x]);
}`,
  explanation: `1. Save the target character at begin position.
2. Recursively fill: if out of bounds or different char, stop.
3. Mark current cell with 'F', then recurse in 4 directions.`
},
{
  name: "fprime",
  level: 4,
  subject: "Write a program that takes a positive int and displays its prime factorization. Factors separated by '*'.",
  learn: "Prime factorization by trial division.",
  code: `#include <stdio.h>
#include <stdlib.h>

int main(int ac, char **av)
{
\tint n;
\tint i = 2;

\tif (ac == 2)
\t{
\t\tn = atoi(av[1]);
\t\tif (n == 1)
\t\t\tprintf("1");
\t\twhile (n > 1)
\t\t{
\t\t\tif (n % i == 0)
\t\t\t{
\t\t\t\tprintf("%d", i);
\t\t\t\tn /= i;
\t\t\t\tif (n > 1)
\t\t\t\t\tprintf("*");
\t\t\t}
\t\t\telse
\t\t\t\ti++;
\t\t}
\t}
\tprintf("\\n");
}`,
  explanation: `1. Start dividing n by 2, then 3, etc.
2. When divisible, print the factor and divide.
3. Print '*' between factors (only if more factors remain).
4. Special case: print "1" for n=1.`
},
{
  name: "ft_itoa",
  level: 4,
  subject: "Write a function that converts an integer to a null-terminated string (allocated with malloc). char *ft_itoa(int nbr);",
  learn: "Number-to-string conversion, handling negatives, dynamic allocation.",
  code: `#include <stdlib.h>

int get_len(int n)
{
\tint len = 0;
\tif (n <= 0)
\t\tlen = 1;
\twhile (n)
\t{
\t\tlen++;
\t\tn /= 10;
\t}
\treturn (len);
}

char *ft_itoa(int nbr)
{
\tint\t\tlen;
\tchar\t*str;
\tlong\tn = nbr;

\tlen = get_len(nbr);
\tif (n < 0)
\t{
\t\tlen++;
\t\tn = -n;
\t}
\tstr = malloc(len + 1);
\tif (!str)
\t\treturn (NULL);
\tstr[len] = '\\0';
\twhile (len--)
\t{
\t\tstr[len] = n % 10 + '0';
\t\tn /= 10;
\t}
\tif (nbr < 0)
\t\tstr[0] = '-';
\treturn (str);
}`,
  explanation: `1. Count digits needed (extra 1 for '-' if negative).
2. Allocate string.
3. Fill from the end: last digit first using % 10.
4. If negative, set first char to '-'.`
},
{
  name: "ft_list_foreach",
  level: 4,
  subject: "Write a function that applies a function f to the data of each element of a linked list. void ft_list_foreach(t_list *begin_list, void (*f)(void *));",
  learn: "Function pointers, linked list traversal.",
  code: `typedef struct s_list
{
\tstruct s_list *next;
\tvoid          *data;
}\tt_list;

void ft_list_foreach(t_list *begin_list, void (*f)(void *))
{
\twhile (begin_list)
\t{
\t\tf(begin_list->data);
\t\tbegin_list = begin_list->next;
\t}
}`,
  explanation: `1. Walk the list.
2. Call f() on each node's data.
3. Move to next node.`
},
{
  name: "ft_list_remove_if",
  level: 4,
  subject: "Remove all nodes from a linked list whose data matches data_ref (compared using cmp function). void ft_list_remove_if(t_list **begin_list, void *data_ref, int (*cmp)());",
  learn: "Linked list deletion with double pointer, function pointers for comparison.",
  code: `#include <stdlib.h>

typedef struct s_list
{
\tstruct s_list *next;
\tvoid          *data;
}\tt_list;

void ft_list_remove_if(t_list **begin_list, void *data_ref, int (*cmp)())
{
\tt_list *tmp;

\tif (!begin_list || !*begin_list)
\t\treturn ;
\tif (cmp((*begin_list)->data, data_ref) == 0)
\t{
\t\ttmp = *begin_list;
\t\t*begin_list = (*begin_list)->next;
\t\tfree(tmp);
\t\tft_list_remove_if(begin_list, data_ref, cmp);
\t}
\telse
\t\tft_list_remove_if(&(*begin_list)->next, data_ref, cmp);
}`,
  explanation: `1. If current node matches, save it, point head to next, free saved, recurse on same position.
2. If doesn't match, recurse on the next node.
3. Recursive approach with double pointer handles head removal cleanly.`
},
{
  name: "ft_split",
  level: 4,
  subject: "Write a function that splits a string by whitespace into an array of strings. char **ft_split(char *str);",
  learn: "Word counting, dynamic allocation of string array, extracting substrings.",
  code: `#include <stdlib.h>

static int is_space(char c)
{
\treturn (c == ' ' || c == '\\t' || c == '\\n');
}

static int count_words(char *s)
{
\tint count = 0;
\twhile (*s)
\t{
\t\twhile (*s && is_space(*s)) s++;
\t\tif (*s) count++;
\t\twhile (*s && !is_space(*s)) s++;
\t}
\treturn (count);
}

static char *get_word(char *s, int len)
{
\tchar *w = malloc(len + 1);
\tint i = 0;
\twhile (i < len)
\t{
\t\tw[i] = s[i];
\t\ti++;
\t}
\tw[i] = '\\0';
\treturn (w);
}

char **ft_split(char *str)
{
\tchar **res;
\tint i = 0;
\tint start;

\tres = malloc(sizeof(char *) * (count_words(str) + 1));
\tif (!res)
\t\treturn (NULL);
\twhile (*str)
\t{
\t\twhile (*str && is_space(*str)) str++;
\t\tif (*str)
\t\t{
\t\t\tstart = 0;
\t\t\twhile (str[start] && !is_space(str[start])) start++;
\t\t\tres[i++] = get_word(str, start);
\t\t\tstr += start;
\t\t}
\t}
\tres[i] = NULL;
\treturn (res);
}`,
  explanation: `1. Count words to know how many pointers to allocate.
2. For each word: find its start and length, copy it into a new malloc'd string.
3. Null-terminate the array.`
},
{
  name: "rev_wstr",
  level: 4,
  subject: "Write a program that takes a string and displays its words in reverse order. Words are separated by spaces/tabs.",
  learn: "Finding words from the end, reverse word printing.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i;
\tint start;
\tint first = 1;

\tif (ac == 2)
\t{
\t\ti = 0;
\t\twhile (av[1][i])
\t\t\ti++;
\t\twhile (i > 0)
\t\t{
\t\t\ti--;
\t\t\twhile (i >= 0 && (av[1][i] == ' ' || av[1][i] == '\\t'))
\t\t\t\ti--;
\t\t\tstart = i;
\t\t\twhile (i >= 0 && av[1][i] != ' ' && av[1][i] != '\\t')
\t\t\t\ti--;
\t\t\tif (start >= 0)
\t\t\t{
\t\t\t\tif (!first)
\t\t\t\t\twrite(1, " ", 1);
\t\t\t\tfirst = 0;
\t\t\t\tint j = i + 1;
\t\t\t\twhile (j <= start)
\t\t\t\t\twrite(1, &av[1][j++], 1);
\t\t\t}
\t\t}
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Start from the end of the string.
2. Skip trailing whitespace, find end of word, find start of word.
3. Print the word forward, then repeat for previous words.
4. Separate words with a single space.`
},
{
  name: "rostring",
  level: 4,
  subject: "Write a program that takes a string and rotates its words: the first word goes to the end. Extra spaces reduced to one.",
  learn: "Word extraction, reordering output, whitespace normalization.",
  code: `#include <unistd.h>

int main(int ac, char **av)
{
\tint i = 0;
\tint first_start, first_end;

\tif (ac >= 2)
\t{
\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\ti++;
\t\tfirst_start = i;
\t\twhile (av[1][i] && av[1][i] != ' ' && av[1][i] != '\\t')
\t\t\ti++;
\t\tfirst_end = i;
\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\ti++;
\t\tint printed = 0;
\t\twhile (av[1][i])
\t\t{
\t\t\tif (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t{
\t\t\t\twhile (av[1][i] == ' ' || av[1][i] == '\\t')
\t\t\t\t\ti++;
\t\t\t\tif (av[1][i])
\t\t\t\t\twrite(1, " ", 1);
\t\t\t}
\t\t\telse
\t\t\t{
\t\t\t\twrite(1, &av[1][i++], 1);
\t\t\t\tprinted = 1;
\t\t\t}
\t\t}
\t\tif (printed)
\t\t\twrite(1, " ", 1);
\t\ti = first_start;
\t\twhile (i < first_end)
\t\t\twrite(1, &av[1][i++], 1);
\t}
\twrite(1, "\\n", 1);
}`,
  explanation: `1. Find the first word (skip leading spaces, read word, note start/end).
2. Print remaining words (with normalized single spaces).
3. Print first word at the end.`
},
{
  name: "sort_int_tab",
  level: 4,
  subject: "Write a function that sorts an integer array in ascending order. void sort_int_tab(int *tab, unsigned int size);",
  learn: "Simple sorting (bubble sort), in-place array modification.",
  code: `void sort_int_tab(int *tab, unsigned int size)
{
\tunsigned int i;
\tint tmp;
\tint sorted = 0;

\twhile (!sorted)
\t{
\t\tsorted = 1;
\t\ti = 0;
\t\twhile (i < size - 1)
\t\t{
\t\t\tif (tab[i] > tab[i + 1])
\t\t\t{
\t\t\t\ttmp = tab[i];
\t\t\t\ttab[i] = tab[i + 1];
\t\t\t\ttab[i + 1] = tmp;
\t\t\t\tsorted = 0;
\t\t\t}
\t\t\ti++;
\t\t}
\t}
}`,
  explanation: `1. Classic bubble sort: repeatedly swap adjacent elements if out of order.
2. Keep going until no swaps happen (sorted = 1).
3. Simple and easy to memorize.`
},
{
  name: "sort_list",
  level: 4,
  subject: "Sort a linked list using a given comparison function. t_list *sort_list(t_list *lst, int (*cmp)(int, int));",
  learn: "Linked list sorting with function pointers, bubble sort on list data.",
  code: `typedef struct s_list
{
\tstruct s_list *next;
\tint           data;
}\tt_list;

t_list *sort_list(t_list *lst, int (*cmp)(int, int))
{
\tt_list *cur;
\tint tmp;
\tint sorted = 0;

\twhile (!sorted)
\t{
\t\tsorted = 1;
\t\tcur = lst;
\t\twhile (cur && cur->next)
\t\t{
\t\t\tif (!cmp(cur->data, cur->next->data))
\t\t\t{
\t\t\t\ttmp = cur->data;
\t\t\t\tcur->data = cur->next->data;
\t\t\t\tcur->next->data = tmp;
\t\t\t\tsorted = 0;
\t\t\t}
\t\t\tcur = cur->next;
\t\t}
\t}
\treturn (lst);
}`,
  explanation: `1. Bubble sort on linked list: swap DATA (not nodes).
2. cmp returns true if order is correct. If not, swap.
3. Repeat until no swaps needed.
4. Return head (unchanged since we swap data, not pointers).`
}
];