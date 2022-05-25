#include <iostream>
#include <math.h>
using namespace std;
bool isPalindrome(int x)
{
    int temp = x, sum = 0;
    while (x > 0)
    {
        int r = x % 10;
        sum = (x * 10) + r;
        x = x / 10;
    }
    if(sum == temp)
    return true;
    else
    return false;
}

int main()
{
    int n;
    cin >> n;
    cout << isPalindrome(n);
}