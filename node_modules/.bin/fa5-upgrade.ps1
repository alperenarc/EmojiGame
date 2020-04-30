#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir//bin/sh$exe") {
  & "$basedir//bin/sh$exe"  "$basedir/../react-native-vector-icons/bin/fa5-upgrade.sh" $args
  $ret=$LASTEXITCODE
} else {
  & "/bin/sh$exe"  "$basedir/../react-native-vector-icons/bin/fa5-upgrade.sh" $args
  $ret=$LASTEXITCODE
}
exit $ret
