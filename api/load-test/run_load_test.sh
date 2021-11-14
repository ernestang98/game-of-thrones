# https://archive.md/TRzn4#selection-2395.0-2521.4
# https://www.thegeekstuff.com/2010/06/bash-conditional-expression/
# https://stackoverflow.com/questions/8903239/how-to-calculate-time-elapsed-in-bash-script

starting_time=`date`
unset $gen_report
gen_report="NO"
SECONDS=0

echo "Starting time of load test: $starting_time"

while getopts ":r" opt; do
  case $opt in
    r)
      gen_report="YES"
      ;;
  esac
done

if [ $gen_report == "NO" ]; then
  cicada-distributed run
else
  cicada-distributed run > output.txt
fi

ending_time=`date`

echo "Ending time of load test: $ending_time"

duration=$SECONDS

echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
