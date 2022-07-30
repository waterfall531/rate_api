#!/bin/bash
echo "TWD to USD 100 -> "
curl 127.0.0.1:3000/twd/usd/100
echo ""
echo "TWD to JPY 100 -> "
curl 127.0.0.1:3000/twd/jpy/100
echo ""
echo "USD to TWD 333 -> "
curl 127.0.0.1:3000/usd/twd/333
echo ""
echo "USD to JPY 333 -> "
curl 127.0.0.1:3000/usd/jpy/333
echo ""
echo "JPY to TWD 10 -> "
curl 127.0.0.1:3000/jpy/twd/222.22
echo ""
echo "JPY to USD 10 -> "
curl 127.0.0.1:3000/jpy/usd/222.22
echo ""
echo "Typo Without TWD/USD/JPY -> "
curl 127.0.0.1:3000/cny/usd/10
echo ""
echo "Typo Without TWD/USD/JPY -> "
curl 127.0.0.1:3000/usd/eur/10
echo ""
echo "Typo Without Number "
curl 127.0.0.1:3000/twd/usd/adsasd
echo ""
