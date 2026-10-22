#include<iostream>
using namespace std;
int main() {
    int x, y;
    cin>>x;
    for(x;x>=0;x/10) {
        y = x%10;
        cout<< y; 
    }
    return 0;
}