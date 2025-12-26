$ cat > manny.c
#include <stdio.h>

int main(void)
{
    const char *profile[] = {
        "Greetings and welcome to my GitHub profile. My name is Manny, I am a",
        "software engineer, electrical engineer and general hardware hacker. I",
        "have been programming for over thirty years. During that time, I have",
        "programmed on IBM mainframes, 8-bit MCUs the size of a grain of rice",
        "and most hardware in-between. My primary interest is in programming",
        "that is as close to the IC silicon die as possible. As for programming",
        "languages, C and Assembly language are my first choice. As for my",
        "dislikes, those include C++, Bjarne Stroustrup, user interfaces and",
        "anything to do with the web and documentation. I also enjoy electrical",
        "engineering, which pairs nicely with my love for bare metal",
        "programming.",
        NULL
    };

    for (int i = 0; profile[i]; i++)
        printf("%s\n", profile[i]);

    return 0;
}
^D

$ gcc -std=c11 -O2 -Wall -Wextra -pedantic manny.c -o manny

$ ./manny
Greetings and welcome to my GitHub profile. My name is Manny, I am a
software engineer, electrical engineer and general hardware hacker. I
have been programming for over thirty years. During that time, I have
programmed on IBM mainframes, 8-bit MCUs the size of a grain of rice
and most hardware in-between. My primary interest is in programming
that is as close to the IC silicon die as possible. As for programming
languages, C and Assembly language are my first choice. As for my
dislikes, those include C++, Bjarne Stroustrup, user interfaces and
anything to do with the web and documentation. I also enjoy electrical
engineering, which pairs nicely with my love for bare metal
programming.

$ _
