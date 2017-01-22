if test -n $NODE_ENV
then
  if test "production" = "$NODE_ENV"
  then
    yarn deploy
  fi
fi
